const express = require("express");
const router = express.Router();
const annunci_model = require("../schemas/insert-add-model");

router.get("/show-adds", async (req, res) => {
  try {
    const filter = {};

    if (req.query.what)
      filter.titolo = { $regex: new RegExp(req.query.what, 'i') };

    if (req.query.category)
      filter.categoria = { $regex: new RegExp(req.query.category, 'i') }; // ✅ CORRETTO QUI

    if (req.query.where)
      filter.comune = { $regex: new RegExp(req.query.where, 'i') };

    const risultati = await annunci_model.find(filter);
    res.status(200).json(risultati);
  } catch (err) {
    console.error("Errore:", err);
    res.status(500).json({ error: "Errore del server" });
  }
});

module.exports = router;

