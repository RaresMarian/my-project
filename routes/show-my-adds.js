const express = require("express");
const router = express.Router();
const auth=require('../auth/auth');
const annuncio_model= require('../schemas/insert-add-model');


router.get("/show-my-adds", auth,async (req, res) => {
  try {
    const emailUtente = req.user.email; // o req.query.email
    const annunci = await annuncio_model.find({ 'author.email': emailUtente });
    console.log(annunci);
    res.send(annunci);
    
  } catch (err) {
    console.error("Errore durante il rendering:", err);
    res.status(500).send("Errore del server");
  }
});


module.exports=router ;