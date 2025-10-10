const nodemailer = require("nodemailer");
require('dotenv').config();
const pendingRegistrations = {};
const model = require('../schemas/profileModel');
const express = require('express');
const router = express.Router();

// Configurazione SMTP Brevo (funziona su Render)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // TLS esplicito
  auth: {
    user: "raresmarian1996@gmail.com", // o la tua email verificata su Brevo
    pass: process.env.BREVO_SMTP_KEY
  }
});

router.post('/send-email', async (req, res) => {
  try {
    const existingUser = await model.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Email già esistente");
    }

    const email = req.body.email;
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
      from: "raresmarian1996@gmail.com", // deve essere verificata su Brevo
      to: email,
      subject: "Il tuo codice di verifica",
      text: `Il tuo codice di verifica è: ${code}`
    };

    await transporter.sendMail(mailOptions);

    pendingRegistrations.code = code;
    res.status(200).json({ ok: true });

  } catch (error) {
    console.error("Errore invio email:", error);
    res.status(500).json({ ok: false, message: "Errore invio email" });
  }
});

module.exports = {
  router,
  pendingRegistrations
};

