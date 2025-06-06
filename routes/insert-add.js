const express = require("express");
const router = express.Router();
const auth=require('../auth/auth');
const upload_image = require("../config/multer"); // usa il tuo file upload
const Add = require("../schemas/insert-add-model");


router.post('/insert-add', auth, upload_image.single("image"), async (req, res) => {
  try {
    const { titolo, descrizione, prezzo, comune, contatto, categoria, condizione} = req.body;

    const details = {
      titolo,
      descrizione,
      prezzo,
      comune,
      contatto,
      categoria,
      condizione,
      imageUrl: req.file.path,      
      author:{
        email:req.user.email,
        name:req.user.name
      },

    };
  
    const insertadd = await new Add(details).save(); // già qui lo ricevi aggiornato

    res.json({
      ok: true,
      message: 'Annuncio inserito correttamente',
      annuncio: insertadd
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Errore durante il salvataggio dell\'annuncio' });
  }
});


module.exports=router;