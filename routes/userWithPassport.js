const db = require('./../db')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
require('dotenv').config()
const auth = require('./../utils/authUtils')

/* 
 * Routes & middleware 
 * related to user authentication 
*/

module.exports = (app) => {

  /* Passport config */
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  require('./../config/passport')
  app.use(flash()); // Allows us to show error msg to user 
  app.use(function (req, res, next) {
    res.locals.error = req.error || '';
    res.locals.success = req.message || '';
    next();
  });

  /* login */
  app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
    })
  );

  app.post('/user/add', async (req, res) => {
    try {
    const { name, role, email, password } = req.body;
    // First, check if email is already registered 
    // Emails must be unique in our system
    const user = await auth.isUser(email);
    if (user) { 
      res.render('user.ejs', { activeTab: 'home', 
      message: 'Email is already registered' 
    })
      return;
    }
    // 10 is the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRes = await db.query('INSERT INTO development_user (name, role, email, password) VALUES ($1, $2, $3, $4)', [name, role, email, hashedPassword]);

    userRes && res.render('user.ejs', { activeTab: 'home', message: 'User registered!' })
    
    } catch (err) {
      next(err);
    }
    }
  )

  /* Change password */
  // TODO: finish once session logic is in place
  app.post('/user/password', async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = req.body;

      if (newPassword !== confirmNewPassword) {
        res.render('settings.ejs', { 
          message: 'New passwords must match', activeTab: 'settings' 
        })
      }
      // Validate old password against db w/helper function
      if (checkPassword(oldPassword)) {
        // upsert the new pass into db 
        // On success
        res.render('settings.ejs', { 
          message: 'Password updated!', 
          activeTab: 'settings'
        })
      }
    } catch (err) {
      next(err)
    }
  });

  /* Logout */
  app.get('/logout', (req, res) => {
    req.logout();
    res.render('login.ejs', { 
      message: 'You have logged out successfully' 
    });
  });

  /* Passport middleware function to protect routes */
  // function isNotAuth(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return res.redirect('/home');
  //   }
  //   next();
  // }

  // Protects login page from users already logged in
  // const isNotAuth = (req, res, next) => {
  //   req.isAuthenticated ? res.redirect('/home') : next();
  // }

  // // Protects routes
  // const isAuth = (req, res, next) => {
  //   req.isAuthenticated ? next() : res.redirect('/login');
  // }

  // // Protects admin-only routes
  // const isAdmin = (req, res, next) => {
  //   (req.isAuthenticated && req.user.role === 'admin') 
  //   ? next() 
  //   : res.redirect('/login');
  // }

  /* Passport middleware function to protect routes */
  // function isAuth(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }
  //   res.redirect('/login');
  // }

  //this is for the "Create User" route, which should be accesible by logged-in Admin users only
  // function isAdmin(req, res, next) {
  //   if (req.isAuthenticated() && req.user.role === 'admin') {
  //     return next();
  //   }
  //   res.redirect('/home');
  // }
}
