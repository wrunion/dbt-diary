/* Express is configured to retrieve view files from "views" directory */
const db = require('./../db')

module.exports = (app) => {

  app.get("/", (req, res) => {
    res.render("login.ejs", { message: 'Please log in to access that feature' });
  });

  /* Login */

  app.get("/login", (req, res) => {
    res.render("login.ejs", { message: null });
  });

  app.get('/home', (req, res) => {
    res.render('home.ejs', {
      activeTab: 'home'
    })
  })

  app.get('/listings/upload', (req, res) => {
    res.render('./listings/upload.ejs', {
      activeTab: 'listingsUpload'
    })
  })

  // app.post('/listings/upload', (req, res) => {
  //   console.log(req.body)
  //   // Logs: "[Object: null prototype] { listings_csv: 'data.csv' }"
  //   if (req.files) {
  //     console.log(req.files.listings_csv)
  //   } else {
  //     console.log('not available')
  //   }
  // })

  app.post('/listings/upload', function(req, res) {
    console.log(req.body)
    // Logs: "[Object: null prototype] { listings_csv: 'data.csv' }"
    if (req.files) {
      console.log(req.files.listings_csv)
    } else {
      console.log('not available')
    }
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

  /* Logout */
  app.get("/logout", (req, res) => {
    // req.logout();
    res.render("login.ejs", { message: "You have logged out successfully" });
  });

  /* Catch anything else */
  // app.get("*", (req, res) => {
  //   res.render("login.ejs", { message: null });
  // });

}
