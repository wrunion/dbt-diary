/* Utils for creating and authenticating users */
const db = require('./../db')
const bcrypt = require('bcrypt')

module.exports = {

  isMatch: async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return (match);
  },
  /* Returns false or user */
  getUserByEmail: async email => {
    const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);
    // I can't use es6 in my configuration of Node
    if (!res || !res.rows || res.rows.length < 1) { return false; }
    return(res.rows[0]);
  },
  /* Returns false or user */
  getUserById: async id => {
    const res = await db.query('SELECT * FROM development_user WHERE id = $1', [id]);
    // I can't use es6 in my configuration of Node
    if (!res || !res.rows || res.rows.length < 1) { return false; }
    return(res.rows[0]);
  },
  /* Returns true or false */
  isUser: async email => {
    const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);
    return(res.rows.length > 0);
  },
  // this can be rewritten once sessions are in place
  checkPassword: async (pass) => {
    const res = await db.query('SELECT password FROM development_user WHERE email = $1', [req.user.email]);
    if (res && res.rows.length > 0) {
      const hashedPass = res.rows[0];
      const isMatch = await bcrypt.compare(pass, hashedPass);
      return (isMatch);
    }
    return false;
  }
}

