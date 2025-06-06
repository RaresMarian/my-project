const genToken= require('../utils/gentoken');
const conToDb=require('../database/connectToUser');
const express= require('express');
const router=express.Router();
const bcrypt= require('bcrypt');
const User = require('../schemas/profileModel');
const asyncMiddelware=require('../middelware/async');


module.exports=router.post("/", asyncMiddelware(async(req, res) => {
  const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email o password non validi' });
    }
    const token= await genToken(user);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Email o password non validi' });
    }
    else{
      res.status(200).json({"token":token});
    }
}));
