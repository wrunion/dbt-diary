const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const auth = require('./../utils/authUtils')

/*
  * Custom callback function that Passport calls
  * on initialization
  * Params: email and password 
  * It can return a user object, an error message, or "false"
  * if there is no user.
  * By convention, Passport's "next" function is called "done"
*/

  const VerifyCallback = async (req, email, password, next) => {
    try {     

      const user = await auth.getUserByEmail(email);

      if (user) { 
        const isValid = await auth.isMatch(password, user.password);
        if (isValid) {
          return next(null, user);
        } else {
          console.log('incorrect password')
          return next(null, false, { message: 'Incorrect password' })
        }
      } else {
        console.log('incorrect email')
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
    usernameField: 'email',
    passReqToCallback: true
  }, 
  VerifyCallback
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (userId, done) => {
  const sessionUser = await auth.getUserById(userId);

  if (err) { 
    return done(err) 
  }
  
  return done(null, sessionUser);
  }
)

passport.use(strategy)
