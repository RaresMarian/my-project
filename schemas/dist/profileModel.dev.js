"use strict";

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  sex: String,
  birth_date: Date,
  email: {
    type: String,
    unique: true,
    required: true // opzionale, ma consigliato

  },
  cellulare: String,
  password: String
}, {
  timestamps: true
});
module.exports = mongoose.model('User', UserSchema);