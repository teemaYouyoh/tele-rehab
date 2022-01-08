'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema= new Schema({
  name: {
    type: String,
    required: 'Please enter category name'
  },
  children: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('Categories', CategorySchema);