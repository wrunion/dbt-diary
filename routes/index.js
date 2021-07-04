const db = require('./../db')
const auth = require('../middleware/authMiddleware')
const utils = require('../utils/authUtils')

/* Get routes only. POST and PUT routes for user auth & listing uploads are handled by user.js & listings.js */
module.exports = (app) => {

  app.get("/", (req, res) => {
    res.render("login.ejs", { message: 'Please log in to access that feature' });
  });
  
  app.get("/logout", (req, res) => {
    req.logout();
    res.render("login.ejs", { message: "You have logged out successfully" });
  });

  /* All routes below this are protected */
  app.use(auth.isLoggedIn);

  app.get("/login", (req, res) => {
    res.render("login.ejs", { message: null });
  });

  /* Admin route to add a new user */
  // app.get('/user', auth.isAdminAuth, (req, res) => {
  //   res.render('user.ejs', { activeTab: 'home', message: null })
  //   }
  // )

  app.get('/user', (req, res) => {
    res.render('user.ejs', { activeTab: 'home', message: null })
    }
  )

  app.get('/home', (req, res) => {
    res.render('home.ejs', {
      activeTab: 'home'
    })
  })

  app.get('/guide', (req, res) => {
    res.render('guide.ejs', {
      activeTab: 'guide'
    })
  })

  app.get('/settings', (req, res) => {
    res.render('settings.ejs', {
      activeTab: 'settings', message: null
    })
  })

  /* Catch anything else and redirect */
  app.get("*", (req, res) => {
    res.render("login.ejs", { message: null });
  });
}
