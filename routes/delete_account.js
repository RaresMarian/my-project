const express = require('express');
const router = express.Router();
const User = require('../schemas/profileModel');
const verifyToken = require('../auth/auth');

// 🔹 Cancellazione utente loggato (con token)
router.delete('/delete-user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // viene dal token JWT
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.json({ success: false, error: 'Utente non trovato' });
    }

    console.log(`Utente ${userId} eliminato`);
    res.json({ success: true });
  } catch (err) {
    console.error('Errore nella cancellazione:', err);
    res.json({ success: false, error: 'Errore durante la cancellazione' });
  }
});

module.exports = router;
