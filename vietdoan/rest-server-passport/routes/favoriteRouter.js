var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
  .all(Verify.verifyOrdinaryUser)

.get(function (req, res, next) {
  Favorites.findOne({
      postedBy: req.decoded._doc._id
    })
    .populate('postedBy')
    .populate('dishes')
    .exec(function (err, favorite) {
      if (err) throw err;
      res.json(favorite);
    });
})

.post(function (req, res, next) {
  Favorites.findOne({
    postedBy: req.decoded._doc._id
  }, function (err, favorite) {
    if (err) throw err;
    if (!favorite) {
      Favorites.create({
        postedBy: req.decoded._doc._id,
        dishes: [req.body._id]
      }, function (err, new_favorite) {
        if (err) throw err;
        res.json(new_favorite);
      });
    } else {
      var exist = false;
      for (var i = 0; i < favorite.dishes.length; i++)
        if (favorite.dishes[i] == req.body._id) {
          exist = true;
          break;
        }
      if (exist) {
        res.end('It has already existed!');
      } else {
        favorite.dishes.push(req.body._id);
        favorite.save(function (err, favorite) {
          if (err) throw err;
          res.json(favorite);
        });
      }
    }
  });
})

.delete(function (req, res, next) {
  Favorites.findOne({
    postedBy: req.decoded._doc._id
  }, function (err, favorite) {
    if (err) throw err;
    if (!favorite)
      res.end('Your list of favorite dishes does not exist!');
    else {
      favorite.dishes = [];
      favorite.save(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
      });
    }
  });
});

favoriteRouter.route('/:dishObjectId')
  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({
      postedBy: req.decoded._doc._id
    }, function (err, favorite) {
      if (err) throw err;
      if (!favorite)
        res.end('Your list of favorite dishes does not exist!');
      else {
        var index = -1;
        for (var i = 0; i < favorite.dishes.length; i++)
          if (favorite.dishes[i] == req.params.dishObjectId) {
            index = i;
            break;
          }
        if (index > -1)
          favorite.dishes.splice(index, 1);
        favorite.save(function (err, favorite) {
          if (err) throw err;
          res.json(favorite);
        });
      }
    });
  });

module.exports = favoriteRouter;
