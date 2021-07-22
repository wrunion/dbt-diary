require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtGenerator = email => {
  const payload = {
    user: email
  }

  return jwt.sign(payload, process.env.secretOrPrivateKey, { expiresIn: '1hr'})
}

module.exports = jwtGenerator