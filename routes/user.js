const db = require('../db')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
require('dotenv').config()
const utils = require('../utils/authUtils')
const auth = require('../config/authMiddleware')
var cookieSession = require('cookie-session')

/* 
 * Routes & middleware 
 * related to user authentication 
*/

module.exports = (app) => {

  app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }));

  // temp logging for dev debugging
  const customCookieLogger = (req, res, next) => {
    req.cookies ? 
    console.log('cookie logger', req.cookies, req.path)
    : console.log('cookie logger: no cookies found')
    next()
  }

  app.use(customCookieLogger);

  app.use(flash()); // Allows us to show error msg to user 
  app.use(function (req, res, next) { // these are for error messages for dev
    res.locals.error = req.error || '';
    res.locals.success = req.message || '';
    next();
  });

  /* login */
  app.post('/login', auth.authenticate, (req, res) => {
    res.redirect('home')
  });

  app.post('/user/add', async (req, res) => {
    try {
    const { name, role, email, password } = req.body;
    // First, check if email is already registered 
    // Emails must be unique in our system
    const user = await utils.isUser(email);
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
  // WIP
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
  app.get('/logout', auth.logout, (req, res) => {
    res.render('login.ejs', { 
      message: 'You have logged out successfully' 
    });
  });

}
