const db = require('./../db')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
require('dotenv').config()
// const { getUser } = require('./../utils/authUtils')

/* Helper functions for auth */
const checkUser = async email => {
  const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);
  return(res.rows.length > 0);
}

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

const isValid = async (password, user) => {
  const isMatch = await bcrypt.compare(password, user.password);
  return (isMatch);
}

module.exports = (app) => {

  /* Express Sessions */
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );
  /* Passport config */
  require('./../config/passport')
  app.use(passport.initialize());
  app.use(passport.session());
  // Allows us to show error msg to user 
  app.use(flash());
  app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
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

  // const isUser = db.query('SELECT name FROM production_user WHERE email = $1', [req.body.email]);

  const isMatch = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return (match);
  }

  /* Handle input from the login form */
  // app.post('/login',
  //   passport.authenticate('local', {
  //     successRedirect: '/home',
  //     failureRedirect: '/login',
  //     failureFlash: true
  //   })
  // );

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await getUser(email);
      
      if (user) { 
        const isValid = await isMatch(password, user.password);
        if (isValid) {
          // enter user into the express or passport session
          res.redirect('/home'); 
        } else {
          res.render('login.ejs', {
            message: 'Incorrect password'
          }); 
        }
      } else {
        res.render('login.ejs', { message: 'That email is not registered. \n Please try again.' 
      });
      }
    } catch (err) {
      console.log(err)
    }
  });

  app.get('/user', (req, res) => {
    res.render('user.ejs', { activeTab: 'home', message: null })
    }
  )

  app.post('/user/add', async (req, res) => {
    try {
    const { name, role, email, password } = req.body;
    // First, check if email is already registered 
    // Emails must be unique in our system
    const user = await checkUser(email);
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

  // const isValid = async (password, user) => {
  //   const isMatch = await bcrypt.compare(password, user.password);
  //   return (isMatch);
  // }

  // this can be rewritten once sessions are in place
  const checkPassword = async (pass) => {
    const res = await db.query('SELECT password FROM development_user WHERE email = $1', [req.user.email]);
    if (res && res.rows.length > 0) {
      const hashedPass = res.rows[0];
      const isMatch = await bcrypt.compare(pass, hashedPass);
      return (isMatch);
    }
    return false;
  }

  /* Change password */
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

  /* Handle input from the login form */
  // app.post('/login',
  //   passport.authenticate('local', {
  //     successRedirect: '/home',
  //     failureRedirect: '/login',
  //     failureFlash: true
  //   })
  // )
  

  /* Passport middleware function to protect routes */
  // function isNotAuth(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return res.redirect('/home');
  //   }
  //   next();
  // }

  // Protects login page from users already logged in
  const isNotAuth = (req, res, next) => {
    req.isAuthenticated ? res.redirect('/home') : next();
  }

  // Protects routes
  const isAuth = (req, res, next) => {
    req.isAuthenticated ? next() : res.redirect('/login');
  }

  // Protects admin-only routes
  const isAdmin = (req, res, next) => {
    (req.isAuthenticated && req.user.role === 'admin') 
    ? next() 
    : res.redirect('/login');
  }

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