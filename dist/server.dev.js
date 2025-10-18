"use strict";

var PORT = process.env.PORT || 3000; // import modules

var sendEmail = require('./routes/sendEmail').router;

var verify_code = require('./routes/verify-code');

var authentication = require('./routes/authentication');

var express = require('express');

var app = express();

var cors = require('cors'); // import cors to accept request from another port


var path = require('path');

var _ = require('lodash');

var error = require('./middelware/error.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, 'public')));

var loadinfo = require('./routes/load-info');

var home_page = require('./routes/home_page');

var annunci = require('./routes/insert-add');

var trova_annunci = require('./routes/count-my-adds');

var show_my_adds = require('./routes/show-my-adds');

var show_adds = require('./routes/show-adds');

var verify = require('./routes/verify.js');

var dotenv = require("dotenv").config();

var deleting = require('./routes/delete_account.js');

app.use('/', home_page);
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/login/login.html'));
});
app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/register/register.html'));
}); // routes

app.use('/', verify);
app.use('/', annunci);
app.use('/', show_my_adds);
app.use('/', show_adds);
app.use('/', trova_annunci);
app.use('/', loadinfo);
app.use('/', deleting);
app.use('/authentication', authentication);
app.use('/', sendEmail);
app.use('/', verify_code);
app.use(error);
app.listen(PORT, '0.0.0.0', function () {
  console.log("Server in ascolto su http://localhost:".concat(PORT));
});