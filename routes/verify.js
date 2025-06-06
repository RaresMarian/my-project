const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.jwtPrivateKey;
const express = require('express');
const router = express.Router();

router.get('/verify', (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Token mancante.');

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    // ✅ Risposta corretta se il token è valido
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).send('Token non valido.');
  }
});

module.exports = router;
