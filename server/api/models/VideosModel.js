'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VideoSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter video name'
  },
  url: {
    type: String,
    required: 'Please enter video url'
  },
  category: {
    type: String,
    required: 'Please enter video category'
  },
  review: {
    type: String,
    // required: 'Please enter video review',
    default: ""
  },
  repeat: {
    type: String,
    required: 'Please enter video repeat',
    default: 1
  },
  days: {
    type: String,
    required: 'Please enter video days',
    default: 1
  },
  selected: {
    type: [{
      type: Boolean,
    }],
    default: false
  }
});

module.exports = mongoose.model('Videos', VideoSchema);