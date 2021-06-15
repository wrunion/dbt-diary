const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const initialize = async (passport) => {

  /* Helper functions */
  const isCorrectPassword = async (password, storedPassword) => {
    try {
      return await bcrypt.compare(password, storedPassword);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // check if email is in database
  const isRegisteredUser = async (email, pool) => {
    try {
      await pool.query(`SELECT * FROM production_user WHERE email = $1`, [email], 
        (results) => {
          // email is registered 
          if (results && results.rows.length > 0) {
          return results.rows[0];
        } else {
          return false
        }
      })    
      } catch (error) {
        console.log(error.message)
        return false;
      }
    }

  const authenticateUser = async (email, password, done) => {
    try {
      // check for user, and if they're registered, grab their info
      // returns the user info from DB, or returns false
      const user = await isRegisteredUser(email, pool);
      if (!user) {
        return await done(null, false, {
          message: "No user with that email address"
        }); 
      } 
      const passwordMatch = await isCorrectPassword(password, pool);
      // if password is incorrect
      if (!passwordMatch) {
        return await done(null, false, {
          message: 'Password is incorrect'
        });
      }
      if (user && passwordMatch) {
        return await done(null, user);
      } else {
        return await done(null, false, {
          message: 'Incorrect credentials. Please try again'
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

    passport.use(
    new LocalStrategy({ 
        usernameField: "name", 
        passwordField: "password",
        emailField: 'email',
        roleField: 'role' 
      },
      authenticateUser 
    )
  );

  /* Stores user details inside session. serializeUser determines which data of the user
  object should be stored in the session. The result of the serializeUser method is attached
  to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  the user id as the key) req.session.passport.user = {id: 'xyz' */
  
  passport.serializeUser((user, done) => done(null, user.id));

  /* In deserializeUser that key is matched with the in memory array / database or any data resource.
  The fetched object is attached to the request object as req.user */
  passport.deserializeUser(async (id, done) => {
    await pool.query(`SELECT * FROM production_user WHERE id = $1`, [id], async (err, results) => {
      if (err) {
        return await done(err);
      }
      return await done(null, results.rows[0]);
    });
  });

}

module.exports = initialize;


// TODO: this is the PostgreSQL code 
//   passport.deserializeUser(async (id, done) => {
//     await pool.query(`SELECT * FROM production_user WHERE id = $1`, [id], async (err, results) => {
//       if (err) {
//         return await done(err);
//       }
//       return await done(null, results.rows[0]);
//     });
//   });
// }