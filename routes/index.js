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

  /* TEMP sign in logic, until Elle's email validator is in place */
  /* for demo purposes only, this function checks the user input against a hard coded arbitrary email in .env */
  /* later we'll have secret tokens sent to email addresses, that users will click to authenticate */
  
  app.post("/login", async (req, res) => {

    const isUser = db.query('SELECT name FROM production_user WHERE email = $1', [req.body.email]);

    if (isUser) { 
      res.redirect('/home') 
    } else {
      res.render('login.ejs', { message: 'That email is not registered. \n Please try again.' 
    });
    }
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
