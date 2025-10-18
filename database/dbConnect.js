const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';

const connect=mongoose.connect(mongoUri)
  .then(() => console.log(`Connesso a MongoDB su ${mongoUri}`))
  .catch(err => console.error("❌ Error on connect to mongodb"));

module.exports=connect


