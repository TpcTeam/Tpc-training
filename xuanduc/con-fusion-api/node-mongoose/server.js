var mongoose = require('mongoose'),
  assert = require('assert');

var Dishes = require('./models/dishes');
var Leadership = require('./models/leadership');
var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected correctly to server");

  //create a new dish
  Dishes.create({
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
  }, function (err, dish) {
    if (err) throw err;
    console.log('Dish created!');
    console.log(dish);
    // get all the users
    Dishes.find({}, function (err, dishes) {
      if (err) throw err;

      // object of all the users
      //console.log(dishes);
      db.collection('dishes').drop();

    });
  });

  Leadership.create({
    "name": "Peter Pan",
    "image": "images/alberto.png",
    "designation": "Chief Epicurious Officer",
    "abbr": "CEO",
    "description": "Our CEO, Peter, . . ."
  }, function (err, leader) {
    if (err) throw err;
    console.log('Leader created!');
    console.log(leader);
    Leadership.find({}, function (err, leaders) {
      if (err) throw err;
      db.collection('leaders').drop();
    });

  });

  Promotions.create({
    "name": "Weekend Grand Buffet",
    "image": "images/buffet.png",
    "label": "New",
    "price": "19.99",
    "description": "Featuring . . ."
  }, function (err, promo) {
    if (err) throw err;
    console.log('promotion created!');
    console.log(promo);
    Promotions.find({}, function (err, promotions) {
      if (err) throw err;
      db.collection('promotions').drop();
    });

  });

  setTimeout(function () {
    db.close();
  }, 3000);


  /* var newLeader = Leaders({
     "name": "Peter Pan",
     "image": "images/alberto.png",
     "designation": "Chief Epicurious Officer",
     "abbr": "CEO",
     "description": "Our CEO, Peter, . . ."
   });
   newLeader.save(function (err) {
     if (err) throw err;
     console.log('Leader created!');

     // get all the users
     Leaders.find({}, function (err, leadership) {
       if (err) throw err;

       // object of all the users
       console.log(leadership);
       db.collection('leaders').drop(function () {
         db.close();
       });
     });
   });*/


});