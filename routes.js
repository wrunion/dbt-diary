// const flash = require('express-flash')
// const session = require('express-session')
// const bcrypt = require('bcrypt')

/* Express will automatically render all view files from the "views" folder */

/* Passport (user auth) code is currently commented out unti we have an auth method in place and can make use of it */

module.exports = (app, pool) => {

  // /* Configure Passport, the login mechanism for the admin page */
  // const initializePassport = require('./config/initializePassport');
  // initializePassport(passport, pool);
  // app.use(
  //   session({
  //     secret: 'secret',
  //     resave: false,
  //     saveUninitialized: false
  //   })
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.use(flash());
  // app.use(function (req, res, next) {
  //   res.locals.error = req.flash("error");
  //   res.locals.success = req.flash("success")
  //   next();
  // });

  /* Catch all */
  // app.get("/", userIsNotAuthenticated, (req, res) => {
  //   res.render("login", { message: 'You must log in to access that feature' });
  // });

  // /* Catch all */
  // app.get("*", userIsNotAuthenticated, (req, res) => {
  //   res.render("login", { message: null });
  // });

  // /* Login */
  // app.get("/login", userIsNotAuthenticated, (req, res) => {
  //   res.render("login", { message: null });
  // });

  app.get("/", (req, res) => {
    res.render("login", { message: 'You must log in to access that feature' });
  });

  /* Login */

  app.get("/login", (req, res) => {
    res.render("login", { message: null });
  });

  /* TEMP sign in logic, until Elle's email validator is in place */
  /* for demo purposes only, this function checks the user input against a hard coded arbitrary email in .env */
  /* later we'll have secret tokens sent to email addresses, that users will click to authenticate */
  
  app.post("/login", async (req, res) => {

    let authorizedUserEmail = process.env.AUTHORIZED_USER_EMAIL;
    let userEmail = req.body.email

    if (authorizedUserEmail === userEmail) {
      // success
      return res.redirect('/home')
    } else {
      res.render('login.ejs', { message: 'That email is not registered. \n Please try again.' 
    });
    }
  });

  /* --------- TEMP routes for DEV only ---------- */
  /* in prod, these routes need "userIsAuthenticated" and/or "userIsAdmin" middleware functions to secure routes. express-session is one way to do that. passport also has this functionality and a passport-local strategy would meet our sign in/auth needs */

  app.get('/home', (req, res) => {
    res.render('home', {
      activeTab: 'home'
    })
  })

  // TODO: nest upload, preview, and update in a "listings" route
  app.get('/upload', (req, res) => {
    res.render('upload', {
      activeTab: 'upload'
    })
  })

  app.get('/preview', (req, res) => {
    res.render('preview', {
      activeTab: 'preview'
    })
  })

  app.get('/update', (req, res) => {
    res.render('update', {
      activeTab: 'update'
    })
  })


  app.get('/guide', (req, res) => {
    res.render('guide', {
      activeTab: 'guide'
    })
  })

  /* Logout */
  app.get("/logout", (req, res) => {
    // req.logout();
    res.render("login.ejs", { message: "You have logged out successfully" });
  });
  
  /* Catch anything else */
  app.get("*", (req, res) => {
    res.render("login", { message: null });
  });
  
// Middleware -------
  /* Passport middleware function to protect routes */
  // function userIsNotAuthenticated(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return res.redirect("/dashboard");
  //   }
  //   next();
  // }

  // /* Passport middleware function to protect routes */
  // function userIsAuthenticated(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }
  //   res.redirect("/login");
  // }
}

 /* Default handler for the admin page */
  // FOR PROD
  // app.get("/dashboard", userIsAuthenticated, async (req, res, next) => {
  //   try {
  //     res.render('dashboard.ejs', { userData: req.user });
  //   } catch (e) {
  //     return next(e); 
  //   }
  // });