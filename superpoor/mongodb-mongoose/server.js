var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

var Dishes = require('./dishes');
var Promotions = require('./promotions');
var Leaders = require('./leadership');

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected correctly to mongo');

  var newDish = Dishes(dishData);
  newDish.save((err) => {
    if (err) throw err;

    Dishes.find({}, (err, dishes) => {
      if (err) throw err;

      console.log(JSON.stringify(dishes, null, '  '));
      db.collection('dishes').drop();
    });
  });

  var newPromotion = Promotions(promotionData);
  newPromotion.save((err) => {
    if (err) throw err;

    Promotions.find({}, (err, promotions) => {
      if (err) throw err;

      console.log(JSON.stringify(promotions, null, '  '));
      db.collection('promotions').drop();
    });
  });

  var newLeader = Promotions(leaderData);
  newLeader.save((err) => {
    if (err) throw err;

    Leaders.find({}, (err, leaders) => {
      if (err) throw err;

      console.log(JSON.stringify(leaders, null, '  '));
      db.collection('leaders').drop();
    });
  });
});

var dishData =  {
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
};

var promotionData =  {
  "name": "Weekend Grand Buffet",
  "image": "images/buffet.png",
  "label": "New",
  "price": "19.99",
  "description": "Featuring . . ."
}

var leaderData = {
  "name": "Peter Pan",
  "image": "images/alberto.png",
  "designation": "Chief Epicurious Officer",
  "abbr": "CEO",
  "description": "Our CEO, Peter, . . ."
}
