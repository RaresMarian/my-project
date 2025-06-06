"use strict";

var mongoose = require('mongoose');

var addSchema = new mongoose.Schema({
  titolo: String,
  descrizione: String,
  prezzo: Number,
  comune: String,
  contatto: String,
  tipologia: String,
  condizione: String,
  imageUrl: String,
  author: {
    email: String,
    name: String
  }
}, {
  timestamps: true // <-- questa è la posizione corretta

});
module.exports = mongoose.model("Add", addSchema);