const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./../db')
const bcrypt = require('bcrypt')
const { getUser } = require('./../utils/authUtils')

const isMatch = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return (match);
}

const getUser = async email => {
  const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);
  // I can't use es6 in my version of Node
  /* If no user, return false */
  if (!res || !res.rows || res.rows.length < 1) { return false; }
  /* If user, return user */
  return(res.rows[0]);
}

  const VerifyCallback = async (email, password, next) => {
    try {     

      const user = await getUser(email);

      if (user) { 
        const isValid = await isMatch(password, user.password);
        if (isValid) {
          return next(null, user);
        } else {
          return next(null, false, {  message: 'Incorrect password' })
        }
      } else {
        return next(null, false, { message: 'Incorrect email' })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

/* Passport defaults to "username" for auth
*  This tells it we're using email as our unique user ID
*/
const strategy = new LocalStrategy({
  usernameField: email
});

passport.use(strategy, VerifyCallback)



passport.authenticate('local')