const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
require('dotenv').config()

const mockUser = {
  id: 1,
  email: 'winterrunion@gmail.com',
  password: 'pass'
}

const results = [
  {
    id: 1,
    email: 'winterrunion@gmail.com',
    password: 'pass'
  }
]

// this doesn't actually need to be async right now, but it will be once we add in Postgres
const initialize = async (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      // we're just faking creds for now
      let authorizedEmail = mockUser.email;
      let authorizedPass = mockUser.pass;
      // TODO: use bcrypt.compare to see if the passwords match
      if (email === authorizedEmail && password === authorizedPass) {
        let user = results[0]
        return await done (null, user);
      } else if ((email === authorizedEmail) && (password !== authorizedPass)) {
        // wrong password
        return await done (null, false, { message: "Password is incorrect" });
      } else if ((email !== authorizedEmail) && (password === authorizedPass)) {
        // wrong email
        return await done(null, false, {
            message: "No user with that email address"
        })
      } else {
        return await done(null, false, {
          message: "Incorrect credentials. Please check your input and try again."
      })
    }
    } catch (error) {
      console.log(error)
    }
  }

    passport.use(
    new LocalStrategy({ 
        usernameField: "email", 
        passwordField: "password" 
      },
      authenticateUser 
    )
  );

  // TODO: this is sample postgres code
  // async function initialize(passport, pool) {
  //   const authenticateUser = async (email, password, done) => {
  //     await pool.query(
  //       `SELECT * FROM production_user WHERE email = $1`, [email],
  //       async (err, results) => {
  //         if (err) { throw err; }
  //         if (results.rows.length > 0) {
  //           const user = results.rows[0];
  //           await bcrypt.compare(password, user.password, async (err, isMatch) => {
  //             if (err) {
  //               console.error(err);
  //             }
  //             if (isMatch) {
  //               return await done(null, user);
  //             } else {
  //               //password is incorrect
  //               return await done(null, false, { message: "Password is incorrect" });
  //             }
  //           });
  //         } else {
  //           return await done(null, false, {
  //             message: "No user with that email address"
  //           });
  //         }
  //       }
  //     );
  //   };

  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  //   the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => done(null, user.id));

  //   In deserializeUser that key is matched with the in memory array / database or any data resource.
  //   The fetched object is attached to the request object as req.user
  passport.deserializeUser(async (id, done) => {
    try {
      // fetch user from postgres DB with matching id
      return await done(null, results[0]);
    } catch (err) {
      console.log(err.message)
      return await done(err);
    }
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