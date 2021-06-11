const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcrypt')
// reference: https://github.com/timhitchins/rose-city-resource/blob/master/routes/admin.js

module.exports = (app, pool) => {

  /* Configure Passport, the login mechanism for the admin page */
  const initializePassport = require('./../config/initializePassport');
  initializePassport(passport, pool);
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next();
  });
  /* Catch all */
  app.get("/", userIsNotAuthenticated, (req, res) => {
    res.render("login", { message: null });
  });

/* Login */
  app.get("/login", userIsNotAuthenticated, (req, res) => {
    res.render("login", { message: null });
  });

  /* Default handler for the admin page */
  app.get("/admin/dashboard", userIsAuthenticated, async (req, res, next) => {
    try {
        res.render('dashboard.ejs', { userData: req.user });
    } catch (e) {
      return next(e); // ask Kent about this
    }
  });

  /* BEFORE PROD: add middleware to protect this route */
  app.get('/admin/map', (req,res) => {
    try {
      res.render('mapDataDashboard.ejs');
  } catch (e) {
      return next(e); // ask Kent about this
    }
  });

    /* BEFORE PROD: add middleware to protect this route */
    app.get('/admin/static', (req,res) => {
      try {
        res.render('staticDataDashboard.ejs');
    } catch (e) {
        return next(e); // ask Kent about this
      }
    });

  /* Create new user (super user only) */
  app.get('/admin/register', userIsAdmin, (req, res) => {
    res.render('registerUser.ejs');
  });

  app.post('/admin/register', userIsAdmin, (req, res) => {
    const registerUser = async () => {
      try {
        const { name, role, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query('INSERT INTO production_user (name, role, email, password) VALUES ($1, $2, $3, $4)', [name, role, email, hashedPassword]
        );
        res.render('dashboard');
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
    }
    registerUser();
  });

  /* Logout */
  app.get("/admin/logout", (req, res) => {
    req.logout();
    res.render("login.ejs", { message: "You have logged out successfully" });
  });

  /* Handle input from the login form */
  app.post("/admin/login",
    passport.authenticate("local", {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/admin/login",
      failureFlash: true
    })
  );


// Middleware -------
  /* Passport middleware function to protect routes */
  function userIsNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/admin/dashboard");
    }
    next();
  }

  /* Passport middleware function to protect routes */
  function userIsAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/admin/login");
  }

  //this is for the "Create User" route, which should be accesible by logged-in Admin users only
  function userIsAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === "admin") {
      return next();
    }
    res.redirect("/admin/dashboard");
  }
}
