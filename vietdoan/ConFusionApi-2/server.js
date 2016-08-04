var mongoose = require('mongoose'),
  assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leadership = require('./models/leadership');
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected correctly to server");
  var newDish = Dishes({
    "name": "Uthapizza",
    "image": "images/uthapizza.png",
    "category": "mains",
    "label": "Hot",
    "price": "4.99",
    "description": "A unique . . .",
    "comments": [
      {
        "rating": 5,
        "comment": "Imagine all the eatables, living in conFusion!",
        "author": "John Lemon"
        },
      {
        "rating": 4,
        "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        "author": "Paul McVites"
        }
      ]
  });

  var newPromotion = Promotions({
    "name": "Weekend Grand Buffet",
    "image": "images/buffet.png",
    "label": "New",
    "price": "19.99",
    "description": "Featuring . . ."
  });

  var newLeader = Leadership({
    "name": "Peter Pan",
    "image": "images/alberto.png",
    "designation": "Chief Epicurious Officer",
    "abbr": "CEO",
    "description": "Our CEO, Peter, . . ."
  });
  // save the user
  newDish.save(function (err) {
    if (err) throw err;
    console.log('Dish created!');

    // get all the users
    Dishes.find({}, function (err, dishes) {
      if (err) throw err;

      // object of all the users
      console.log(dishes);
      db.collection('dishes').drop();
    });
  });

  newPromotion.save(function (err) {
    if (err) throw err;
    console.log('Promotion created!');

    // get all the users
    Promotions.find({}, function (err, promotions) {
      if (err) throw err;

      // object of all the users
      console.log(promotions);
      db.collection('promotions').drop();
    });
  });

  newLeader.save(function (err) {
    if (err) throw err;
    console.log('Leader created!');

    // get all the users
    Leadership.find({}, function (err, leadership) {
      if (err) throw err;

      // object of all the users
      console.log(leadership);
      db.collection('leaders').drop(function () {
        db.close();
      });
    });
  });
});
