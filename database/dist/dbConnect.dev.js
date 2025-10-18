"use strict";

var mongoose = require('mongoose');

var dotenv = require('dotenv');

dotenv.config();
var mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
var connect = mongoose.connect(mongoUri).then(function () {
  return console.log("Connesso a MongoDB su ".concat(mongoUri));
})["catch"](function (err) {
  return console.error("❌ Error on connect to mongodb");
});
module.exports = connect;