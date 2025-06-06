const express = require("express");
const router = express.Router();
const auth=require('../auth/auth');
const user=require('../schemas/profileModel');


router.get('/load-info',auth,async(req,res)=>{
    const userInfo = await user.findById(req.user.id).select('-password'); // esclude password
    if (!userInfo) return res.status(404).json({ error: 'Utente non trovato' });
    res.status(200).json(userInfo);

})

module.exports=router ;