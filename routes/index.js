const db = require('./../db')

/* Get routes only. POST and PUT routes for user auth or listing uploads are handled by user.js & listings.js */

module.exports = (app) => {

  app.get("/", (req, res) => {
    res.render("login.ejs", { message: 'Please log in to access that feature' });
  });

  app.get("/login", (req, res) => {
    res.render("login.ejs", { message: null });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.render("login.ejs", { message: "You have logged out successfully" });
  });

  /* Admin route to add a new user */
  app.get('/user', (req, res) => {
    res.render('user.ejs', { activeTab: 'home', message: null })
    }
  )

  app.get('/home', (req, res) => {
    res.render('home.ejs', {
      activeTab: 'home'
    })
  })

  /* Listings */
  app.get('/listings/upload', (req, res) => {
    res.render('./listings/upload.ejs', {
      activeTab: 'listingsUpload'
    })
  })

  app.get('/listings/preview', (req, res) => {
    res.render('./listings/preview.ejs', {
      activeTab: 'listingsPreview'
    })
  })

  app.get('/listings/update', (req, res) => {
    res.render('./listings/update.ejs', {
      activeTab: 'listingsUpdate'
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
