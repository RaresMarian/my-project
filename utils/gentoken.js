const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Carica le variabili d'ambiente

function generaToken(user) {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name:user.name

    },
    process.env.jwtPrivateKey,
    { expiresIn: '1d' }
  );
  return token;
}

module.exports = generaToken;

