const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const initialize = async (passport) => {

  // /* Helper functions */
  // const isCorrectPassword = async (password, storedPassword) => {
  //   console.log(password, storedPassword)
  //   try {
  //     return await bcrypt.compare(password, storedPassword);
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  // // check if email is in database
  // const errorOrUser = async (email, pool) => {
  //   console.log(email)
  //   try {
  //     await pool.query(`SELECT * FROM production_user WHERE email = $1`, [email], 
  //       (results) => {
  //         // email is registered 
  //         if (results && results.rows.length > 0) {
  //         return results.rows[0];
  //       } else {
  //         return false
  //       }
  //     })    
  //     } catch (error) {
  //       console.log(error.message)
  //       return false;
  //     }
  //   }

  // const authenticateUser = async (email, password, done) => {
  //   console.log('main function', email, password)
  //   try {
  //     // check for user, and if they're registered, grab their info
  //     // returns the user info from DB, or returns false
  //     const user = await errorOrUser(email, pool);
  //     if (!user) {
  //       return await done(null, false, {
  //         message: "No user with that email address"
  //       }); 
  //     } 
  //     const passwordMatch = await isCorrectPassword(password, pool);
  //     // if password is incorrect
  //     if (!passwordMatch) {
  //       return await done(null, false, {
  //         message: 'Password is incorrect'
  //       });
  //     }
  //     if (user && passwordMatch) {
  //       return await done(null, user);
  //     } else {
  //       return await done(null, false, {
  //         message: 'Incorrect credentials. Please try again'
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // trying it the RCR way
  async function initialize(passport, pool) {

    const authenticateUser = async (email, password, done) => {
      await pool.query(
        `SELECT * FROM production_user WHERE email = $1`, [email],
        async (err, results) => {
          if (err) { throw err; }
          if (results.rows.length > 0) {
            const user = results.rows[0];
            await bcrypt.compare(password, user.password, async (err, isMatch) => {
              if (err) {
                console.error(err);
              }
              if (isMatch) {
                return await done(null, user);
              } else {
                //password is incorrect
                return await done(null, false, { message: "Password is incorrect" });
              }
            });
          } else {
            return await done(null, false, {
              message: "No user with that email address"
            });
          }
        }
      );
    };
  
    passport.use(
      new LocalStrategy(
        { usernameField: "email", passwordField: "password", roleField: 'role' },
        authenticateUser 
      )
    );
  
    // passport.use(new LocalStrategy({
    //   usernameField: "email", passwordField: "password", roleField: 'role' , passReqToCallback: true,
    // },
    //   function(username, password, role, done) {
    //     User.findOne({ username: username }, function (err, user) {
    //       if (err) { return done(err); }
    //       if (!user) { return done(null, false); }
    //       if (!user.verifyPassword(password)) { return done(null, false); }
    //       return done(null, user);
    //     });
    //   }
    // ));
  
  
  
  
    // Stores user details inside session. serializeUser determines which data of the user
    // object should be stored in the session. The result of the serializeUser method is attached
    // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
    //   the user id as the key) req.session.passport.user = {id: 'xyz'}
    passport.serializeUser((user, done) => done(null, user.id));
  
    // In deserializeUser that key is matched with the in memory array / database or any data resource.
    // The fetched object is attached to the request object as req.user
  
    passport.deserializeUser(async (id, done) => {
      await pool.query(`SELECT * FROM production_user WHERE id = $1`, [id], async (err, results) => {
        if (err) {
          return await done(err);
        }
        return await done(null, results.rows[0]);
      });
    });
  }
}

module.exports = initialize;

//     passport.use(
//     new LocalStrategy({ 
//         usernameField: "name", 
//         passwordField: "password",
//         roleField: 'role' 
//       },
//       authenticateUser 
//     )
//   );

//   /* Stores user details inside session. serializeUser determines which data of the user
//   object should be stored in the session. The result of the serializeUser method is attached
//   to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
//   the user id as the key) req.session.passport.user = {id: 'xyz' */
  
//   passport.serializeUser((user, done) => done(null, user.id));

//   /* In deserializeUser that key is matched with the in memory array / database or any data resource.
//   The fetched object is attached to the request object as req.user */
//   passport.deserializeUser(async (id, done) => {
//     await pool.query(`SELECT * FROM production_user WHERE id = $1`, [id], async (err, results) => {
//       if (err) {
//         return await done(err);
//       }
//       return await done(null, results.rows[0]);
//     });
//   });

// }

// module.exports = initialize;


// // TODO: this is the PostgreSQL code 
// //   passport.deserializeUser(async (id, done) => {
// //     await pool.query(`SELECT * FROM production_user WHERE id = $1`, [id], async (err, results) => {
// //       if (err) {
// //         return await done(err);
// //       }
// //       return await done(null, results.rows[0]);
// //     });
// //   });
// /*/ 