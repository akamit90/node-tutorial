// models/User.js
const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  taste: {
    type: String,
    enum: ['sweet', 'sour', 'bitter', 'salty','spicy'],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients:{
    type:[String],
    default: []
  },
  num_sales:{
    type:Number,
    default:0
  }
});

const MenuItem = mongoose.model('MenuItem', menuSchema);

module.exports = MenuItem;
