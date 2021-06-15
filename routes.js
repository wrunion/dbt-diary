const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcrypt')

/* Express will automatically render files from the "views" folder, which is why the routes simply have file names, instead of relative paths */

module.exports = (app, pool) => {

  /* Configure Passport, the login mechanism for the admin page */
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

  app.get("/staff/login", (req, res) => {
    res.render("login", { message: null });
  });



  /* temporary dummy sign in logic, until Elle's email validator is in place */
  // for demo purposes only, there's a single hard coded user email, and we'll just check if it matches what the user entered
  // evntually we'll have secret tokens sent to email addresses, that users will click to authenticate 
   app.post("/login", (req, res) => {

    let authorizedUserEmail = process.env.AUTHORIZED_USER_EMAIL;
    let userEmail = req.body.email

    if (authorizedUserEmail === userEmail) {
      // success
      return res.redirect('/dashboard')
    } else {
      res.render('login.ejs', { message: 'That email is not registered. \n Please try again.' 
    });
    }
  });

  /* --------- the routes below are for DEV only ---------- */
  /* --------- in prod, they need to be protected by passport middleware (or other auth checking) functions ---------- */

  // dev/demo only
  app.get('/home', (req, res) => {
    res.render('home', {
      activeTab: 'home'
    })
  })

  // dev/demo only
  app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
      activeTab: 'dashboard'
    })
  })

  // dev/demo only
  app.get('/upload', (req, res) => {
    res.render('upload', {
      activeTab: 'upload'
    })
  })

  // dev/demo only
  app.get('/preview', (req, res) => {
    res.render('preview', {
      activeTab: 'preview'
    })
  })

  // dev/demo only
  app.get('/users', (req, res) => {
    res.render('users', {
      activeTab: 'users'
    })
  })


  // dev/demo only
  app.get('/settings', (req, res) => {
    res.render('settings', {
      activeTab: 'settings'
    })
  })
  
  // dev/demo only
  app.get('/update', (req, res) => {
    res.render('update', {
      activeTab: 'update'
    })
  })

  /* Logout */
  app.get("/logout", (req, res) => {
    // req.logout();
    res.render("login.ejs", { message: "You have logged out successfully" });
  });
  
  // TODO: add "userIsAdmin" middleware to this function
  app.post('/add-user', async (req, res) => {
    const registerUser = async () => {
      try {
        const { name, role, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query('INSERT INTO production_user (name, role, email, password) VALUES ($1, $2, $3, $4)', [name, role, email, hashedPassword]
        );
        console.log('success! user created!')
        res.render('users', { activeTab: 'users' });
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
    }
    registerUser();
      // const { name, email, password, role } = req.body;
      // console.log(name, email, password, role)
  })

  /* Catch anything else */
  app.get("*", (req, res) => {
    res.render("login", { message: null });
  });

  /* Handle input from the login form */
  // app.post("/login",
  //   passport.authenticate("local", {
  //     successRedirect: "/home",
  //     failureRedirect: "/login",
  //     failureFlash: true
  //   })
  // );


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
  //     return next(e); // ask Kent about this
  //   }
  // });