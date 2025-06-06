const nodemailer = require("nodemailer");
require('dotenv').config();
const pendingRegistrations = {};
const model= require('../schemas/profileModel');
const express= require('express');
const router=express.Router();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "raresmarian1996@gmail.com",
    pass: process.env.googlePassword
  }
});

router.post('/send-email',async(req,res)=>{
  const existingUser = await model.findOne({ email: req.body.email });
  if (existingUser) {return res.status(400).send("Email già esistente");}

  const email = req.body.email;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const mailOptions = {
    from: "raresmarian1996@gmail.com",
    to: email,
    subject: "Il tuo codice di verifica",
    text: `Il tuo codice di verifica è: ${code}`
  };

  try {
    await transporter.sendMail(mailOptions);
    pendingRegistrations.code=code;
    res.status(200).json({"ok":true})


  } catch (error) {
    console.error("Errore invio email:", error);
    throw new Error("Errore invio email");
  }
})

module.exports = {
  router,
  pendingRegistrations
};
