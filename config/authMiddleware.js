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
      //  If they are, return the entire user object from the DB
      //  If not, return false
      const user = await utils.getUserByEmail(email);
      /* Validate password using bcrypt's compare method */
      if (user) { 
        const isValid = await utils.isMatch(password, user.password);
        // Password is correct
        if (isValid) {        
          // TODO: set a JWT here
          // save it to the db, and return only the JWT 
          // and the user id to the route
          res.cookie('authToken', '{TOKEN}')
          res.cookie('role', 'user') // this will eventually be user.role, from the DB/user object 
          return next(); // this is middleware in a route. this calls the next function on the route, which in this case, will 
          // render "home.ejs"
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
    // TODO: replace with secure JWT token 
    if (utils.isAuth(req) && utils.isAdmin(req)) {
      next();
    } else {
      // this is somewhat arbitrary
      // we just want to keep non-admins out of the "users" route
      res.redirect('/home');
    }
  },
  // this is configured to run on every route
  // except when unauthorized users hit login
  isLoggedIn: (req, res, next) => {
    // TODO: replace with secure JWT token 
    if (req.cookies && req.cookies['authToken'] === '{TOKEN}') {
      if (req.path.toString().includes('login')) {
        // we don't want logged in users to be able to access
        // the login page
        res.redirect('/home'); 
      } 
      next();
    } else {
      res.render('login.ejs', { 
        message: 'Please log in in to access that feature' }
      )
    }
  }

}