var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.findOne({
        postedBy: req.decoded._doc._id
      })
      .populate('postedBy')
      .populate('dishes')
      .exec(function(err, favorite) {
        if (err) throw err;
        res.json(favorite);
      });
  })
  .post(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.findOne({
        postedBy: req.decoded._doc._id
      },
      function(err, favorite) {
        if (err) throw err;
        if (favorite) {
          favorite.dish.push(req.body._id);
          favorite.save(function(err, favorite) {
              if (err) throw err;
              res.json(favorite);
          })
        } else {
          Favorites.create({
            postedBy: req.decoded._doc._id,
            dish: [req.body._id]
          });
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          res.end('Created and added to favorite');
        }
      })
  })
  .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.findOne({
        postedBy: req.decoded._doc._id
      })
      .exec(function(err, favorite) {
        if (err) throw err;
        favorite.dish = [];
        favorite.save(function(err, favorite) {
            if (err) throw err;
            res.json(favorite);
        })
      })
  });

favoriteRouter.route('/:dishObjectId')
  .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.findOne({
        postedBy: req.decoded._doc._id
      })
      .exec(function(err, favorite) {
        if (err) throw err;
        for(var i = 0; i < favorite.dish.length; i++)
            if (favorite.dish[i] == req.params.dishObjectId)
            favorite.dish.splice(i, i+1);
        favorite.save(function(err, favorite) {
            if (err) throw err;
            res.json(favorite);
        })
      })
  });

module.exports = favoriteRouter;
