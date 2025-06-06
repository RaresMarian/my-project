const PORT = process.env.PORT || 3000;

// import modules
const sendEmail= require('./routes/sendEmail').router;
const verify_code=require('./routes/verify-code');
const authentication=require('./routes/authentication');
const express = require('express');
const app = express();
const cors = require('cors'); // import cors to accept request from another port
const path = require('path');
const _ = require('lodash');
const error= require('./middelware/error.js');

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const loadinfo= require('./routes/load-info');
const home_page= require('./routes/home_page');
const annunci= require('./routes/insert-add');
const trova_annunci=require('./routes/count-my-adds');
const show_my_adds= require('./routes/show-my-adds');
const show_adds=require('./routes/show-adds');
const verify= require('./routes/verify.js');
const dotenv = require("dotenv").config();


app.use('/', home_page);

app.get('/login',(req, res) => {
    res.sendFile(path.join(__dirname, 'public/login/login.html'));
  });

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register/register.html'));
  });

// routes
app.use('/',verify);
app.use('/',annunci);
app.use('/',show_my_adds);
app.use('/',show_adds);
app.use('/',trova_annunci);
app.use('/',loadinfo);

app.use('/authentication',authentication);
app.use('/',sendEmail);
app.use('/',verify_code);
app.use(error);



app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
