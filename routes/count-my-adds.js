const express = require("express");
const router = express.Router();
const auth=require('../auth/auth');
const mongose= require('mongoose');
const add_model=require('../schemas/insert-add-model')
const profile_model=require('../schemas/profileModel');

router.get('/find-add', auth, async (req, res) => {
  try {
    const count = await add_model.countDocuments({ "author.email": req.user.email });
    const add= await add_model.find().select('-_id -imageUrl');
    res.json({ ok: true, total: count });
     
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});




module.exports=router;