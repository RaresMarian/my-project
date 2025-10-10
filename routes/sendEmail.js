const express = require("express");
const router = express.Router();
require("dotenv").config();
const model = require("../schemas/profileModel");
const pendingRegistrations = {};

// Importa la libreria ufficiale di Brevo
const Brevo = require("@getbrevo/brevo");

// Configurazione API Brevo
const client = new Brevo.TransactionalEmailsApi();
client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

router.post("/send-email", async (req, res) => {
  try {
    const existingUser = await model.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Email già esistente");
    }

    const email = req.body.email;
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const sendSmtpEmail = {
      sender: { email: "raresmarian1996@gmail.com", name: "Verifica account" }, // deve essere verificata su Brevo
      to: [{ email }],
      subject: "Il tuo codice di verifica",
      textContent: `Il tuo codice di verifica è: ${code}`
    };

    // Invia email con l’API
    await client.sendTransacEmail(sendSmtpEmail);

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


