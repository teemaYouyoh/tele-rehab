'use strict';
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
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
  statusCourse: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
    default: "",
  },
  video_chat_url: {
    type: String,
    default: "",
  },
  attachment: {
    type: String,
    default: "",
  },
  status: {
    type: [{
      type: String,
      enum: ['invited', 'registered']
    }],
    default: ['invited']
  }
});

// UserSchema.pre(
//   'save',
//   async function (next) {
//     const user = this;
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
//     next();
//   }
// );

module.exports = mongoose.model('Users', UserSchema);