"use strict";

var User = require('../schemas/profileModel');

User.deleteOne({
  _id: "684304e73869757c4458930d"
}).then(function (result) {
  console.log("Utente cancellato", result);
})["catch"](function (err) {
  return console.error(err);
});