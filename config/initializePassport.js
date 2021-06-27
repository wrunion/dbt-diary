const LocalStrategy = require('passport-local').Strategy
const bcrypt = require ('bcrypt')
const db = require('./../db')
/*
  * A custom callback function that Passport calls
  * on initialization
  * Params: email and password 
  * It can return a user object, an error message, or "false"
  * if there is no user.
  * By convention, Passport's "next" function is called "done"
*/

  /* Helper functions */

  const getUser = async email => {
    const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);
    // This is unnecessarily long, I know, but my version of node won't let me use the "res?.rows" syntax, so it's necessary until I can upgrade
    /* If no user, return false */
    if (!res || !res.rows || res.rows.length < 1) { return false; }
    // the pg response object returns the data in the "rows" array object
    // in this case, there should only be one row
    /* If user, return user */
    return(res.rows[0]);
  }

  const isValid = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return (isMatch);
  }

module.exports = () => {

async function initialize(passport) {

  const authenticateUser = async (email, password, done) => {
    try {
      // Returns user object, or 'false'
      const user = await getUser(email);
      // First arg (null) tells passport there is no error
      // Second arg (false) tells passport there is no user
      if (!user) { 
        return done(null, false, { 
          message: 'Incorrect email address' 
        })}
      // If the email's in our database, check the the password
      const correctPassword = isValid(password, user.password);

      // User is valid. Pass the user object to Passport 
      if (correctPassword) { return(done, user) }
      
      return(done, false, { 
        message: 'Password is incorrect'
      });
    } catch (err) {
      // Passport handles the error
      return done(err);
    }
  }

  passport.use(
    /* Passport automatically looks for a username as 
      a unique identifier. We use email for that, so here we pass
      that info to Passport 
    */
    new LocalStrategy({ 
      usernameField: "email", 
      passwordField: "password"
      },
      authenticateUser 
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((userId, done) => {
    db.query(`SELECT * FROM production_user WHERE id = $1`, [userId],  (err, results) => {
      if (err) {
        return done(err);
      }
      const user = results.rows[0];
      // Declare fields to pass to passport
      const sessionUser = {
        id: user.id,
        name: user.name, 
        email: user.email,
        role: user.role
      }
      return done(null, sessionUser);
    });
  })}
}

module.exports = initialize;


// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // Method either returns the user object from postgres, 
//     // or "false" if the email isn't registered
//     const user = await getUser(email);
//     /* Tell passport there is no error (null) but no user (false) */
//     if (!user) { return done(null, false, { 
//       message: 'Incorrect email address' 
//     }) }
//     /* Compare passwords using bcrypt */
//     const correctPassword = isValid(user, password);
//     /* User is valid. Pass the user object to Passport */
//     if (correctPassword) { return(done, user) }

//     return(done, false, { 
//       message: 'Password is incorrect'
//     });
//   } catch (err) {
//     return done(err);
//   }
// })


// const authenticateUser = async (email, password, done) => {
//   try {

//     const user = await getUser(email);
//     // First arg (null) tells passport there is no error
//     // Second arg (false) tells passport there is no user
//     if (!user) { 
//       return done(null, false, { 
//         message: 'Incorrect email address' 
//       })}

//     // User is valid. Pass the user object to Passport 
//     if (isValid(password, user.password)) { 
//       return(done, user) 
//     }
//     // Passwords don't match
//     return(done, false, { 
//       message: 'Password is incorrect'
//     });
//   } catch (err) {
//     // Passport handles the error
//     return done(err);
//   }
// }