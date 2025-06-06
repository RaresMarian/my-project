"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../routes/sendEmail'),
    pendingRegistrations = _require.pendingRegistrations;

router.get('/verify-code', function (req, res) {
  var code = req.query.code;
  res.json({
    "code": code
  });
});
module.exports = router;