const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./../db')
const bcrypt = require('bcrypt')
// const { getUser } = require('./../utils/authUtils')

const isMatch = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return (match);
}

const getUserByEmail = async email => {
  const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);
  // I can't use es6 in my version of Node
  /* If no user, return false */
  if (!res || !res.rows || res.rows.length < 1) { return false; }
  /* If user, return user */
  return(res.rows[0]);
}

const getUserById = async id => {
  const res = await db.query('SELECT * FROM development_user WHERE id = $1', [id]);
  // I can't use es6 in my version of Node
  /* If no user, return false */
  if (!res || !res.rows || res.rows.length < 1) { return false; }
  /* If user, return user */
  return(res.rows[0]);
}

/*
  * Custom callback function that Passport calls
  * on initialization
  * Params: email and password 
  * It can return a user object, an error message, or "false"
  * if there is no user.
  * By convention, Passport's "next" function is called "done"
*/

  const VerifyCallback = async (email, password, next) => {
    try {     

      const user = await getUserByEmail(email);

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

/* 
* Passport defaults to "username" for user ID
* This tells it we're using email instead
* We also pass our custom auth function here
*/
const strategy = new LocalStrategy({
    usernameField: 'email'
  }, 
  VerifyCallback
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (userId, done) => {
  const sessionUser = await getUserById(userId);
  
  if (err) { return done(err) }
  
  return done(null, sessionUser);
  }
)

passport.use(strategy)
