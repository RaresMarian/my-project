const express=require('express');
const router=express.Router();
const { pendingRegistrations } = require('../routes/sendEmail');
const createProfile= require('../controllers/createProfile');
const genToken= require('../utils/gentoken');
const bcrypt=require('bcrypt');



router.post('/verify-code', async(req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).json({ error: "Codice mancante" });
  }

  if (pendingRegistrations.code !== code) {
    return res.status(400).json({ error: "Codice errato" });
  }

  try{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password=hashedPassword;
    const user = await createProfile(req.body);
    const token = await genToken(user);
    res.status(200).json({user:user.id,token});
  }
  catch(err){
    console.log(err);
  }

  
});

module.exports = router;


