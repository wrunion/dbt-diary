const LocalStrategy = require('passport-local').Strategy
// const User = // create user here; see previous tutorial

module.exports = function (passport) {
  
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  /* Signup config */
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        User.findOne({'local.email': email}, 
        function (err, user) {
          if (err) {
            return done(err)
          }
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is registered'))
          } else {
            const newUser = new User()
            newUser.local.email = email;
            newUser.local.password = password.generateHash(password) // check and see if i should use bcrypt here instead, or if this already is
            newUser.save(function(err) {
              if (err) { throw err }
              return done(null, newUser)
            })
          }
        })
      })
    }
  ))

  /* Login config */
  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({ 'local.email': email },
        function(err, user) {
          if (err) { 
            return done(err) 
          }
          if (!user) { 
            return done(null, false, req.flash('loginMessage', 'No user found.')) 
          }
          if (!user.validPassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Incorrect password - please try again'))
          }
          return done(null, user)
      })
    }))

}
