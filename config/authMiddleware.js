const utils = require('../utils/authUtils')

/*
  * Logic to authenticate users on login
  * and verify auth tokens on subsequent requests
*/

module.exports = {

  authenticate: async (req, res, next) => {
    try {     
      const { email, password } = req.body;
      // See if the email is in our db 
      const user = await utils.getUserByEmail(email);
      // Validate password 
      if (user) { 
        const isValid = await utils.isMatch(password, user.password);
        // Password is correct
        if (isValid) {        
          // TODO: set a JWT here
          // save it to the db, and return only the JWT 
          // and the user id to the route
          res.cookie('authToken', '{TOKEN}')
          res.cookie('role', user.role) 
          return next(); // trigger whatever function comes next 
        } else {
          res.render('login.ejs', { message: 'Incorrect password' })
        }
      } else {
        res.render('login.ejs', { message: 'Incorrect email' })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  logout: (req, res, next) => {
    res.clearCookie('role')
    res.clearCookie('authToken')
    next();
  },
  /* Route protection */
  isAdminAuth: (req, res, next) => {
    if (utils.isAuth(req) && utils.isAdmin(req)) {
      next();
    } else {
      // the location of the redirect is somewhat arbitrary
      // we just want to keep non-admins out of the "users" route
      res.redirect('/home');
    }
  },
  // this is configured to run on every route
  // except when unauthorized users hit login
  isLoggedIn: (req, res, next) => {
    // TODO: replace with secure JWT token 
    if (utils.isAuth(req)) {
      if (req.path.toString().includes('login')) {
        // we don't want logged in users to be able to access
        // the login page
        // redirect them home
        res.redirect('/home'); 
      } 
      // if they're authenticated, we do nothing
      next();
    } else {
      res.render('login.ejs', { 
        message: 'Please log in in to access that feature' }
      )
    }
  }

}