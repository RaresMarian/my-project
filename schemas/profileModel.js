const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  sex: String,
  birth_date: Date,
  email: {
    type: String,
    unique: true,
    required: true // opzionale, ma consigliato
  },
  password: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);




