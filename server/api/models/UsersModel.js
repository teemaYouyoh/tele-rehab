'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema= new Schema({
  name: {
    type: String,
    required: 'Please enter your name'
  },
  phone: {
    type: String,
    required: 'Please enter your phone'
  },
  email: {
    type: String,
    required: 'Please enter your email'
  },
  birthday: {
    type: String,
    required: 'Please enter your birthday'
  },
  diagnosis: {
    type: String,
    required: 'Please enter your diagnosis'
  },
  password: {
    type: String,
  },
  appointments: {
    type: Array,
    default: []
  },
  status: {
    type: [{
      type: String,
      enum: ['invited', 'registered']
    }],
    default: ['invited']
  }
});

module.exports = mongoose.model('Users', UserSchema);