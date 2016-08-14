var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Favorites = require('../models/favorites');

var favRouter = express.Router();
favRouter.use(bodyParser.json());

favRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next) {
	Favorites.find({})
		.populate('postedBy')
		.populate('dishes')
		.exec(function (err, fav) {
			if (err) throw err;
			res.json(fav);
	});
})
.post(function(req, res, next) {
	Favorites.findOne({ 'postedBy' : req.decoded._doc._id }, function(err, 		fav) {
		if (err) throw err;
		if (fav === null) {	
			req.body.postedBy = req.decoded._doc._id;
			req.body.dishes = [mongoose.Types.ObjectId(req.body._id)];
			Favorites.create(req.body, function (err, favo) {
				if (err) throw err;
				console.log('Favorite list created!');
				var id = favo._id;
    		res.writeHead(200, {
      		'Content-Type': 'text/plain'
    		});
    		res.end('Added the favorite list with id: ' + id);
			});
		} else {
			fav.dishes.push(mongoose.Types.ObjectId(req.body._id));
			fav.save(function(err, favo) {
				if (err) throw err;
				console.log('Updated favorite list!');
				res.json(favo);
			});
		}
	})
})
.delete(function(req, res, next) {
	Favorites.findOne({ 'postedBy' : req.decoded._doc._id }).remove().exec(function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
});

favRouter.route('/:dishObjectId')
.all(Verify.verifyOrdinaryUser)
.delete(function(req, res, next) {
	Favorites.findOne({ 'postedBy' : req.decoded._doc._id })
		.populate('postedBy')
		.populate('dishes')
		.exec(function(err, fav) {
			if (err) throw err;
			console.log(fav.dishes);
			console.log(req.params.dishObjectId);
			var index = fav.dishes.indexOf(req.params.dishObjectId);
			fav.dishes.splice(index, 1);
			fav.save(function(err, resp){
				if (err) throw err;
				res.json(resp);
			});
		});
}); 

module.exports = favRouter;