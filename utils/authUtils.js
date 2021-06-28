/* Utils for creating and authenticating users */
const db = require('./../db')
const bcrypt = require('bcrypt')

module.exports = {

  isMatch: async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return (match);
  },
  getUserByEmail: async email => {
    const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);
    // I can't use es6 in my configuration of Node
    if (!res || !res.rows || res.rows.length < 1) { return false; }
    return(res.rows[0]);
  },
  getUserById: async id => {
    const res = await db.query('SELECT * FROM development_user WHERE id = $1', [id]);
    // I can't use es6 in my configuration of Node
    if (!res || !res.rows || res.rows.length < 1) { return false; }
    return(res.rows[0]);
  }
  

}

