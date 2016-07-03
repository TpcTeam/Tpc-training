var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  price: {
    type: mongoose.Types.Currency,
    require: true
  },
  description: {
    type: String,
    required: true
  },
}, {
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;
