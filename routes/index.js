/* Express is configured to retrieve view files from "views" directory */

module.exports = (app, db) => {

  app.get("/", (req, res) => {
    res.render("login.ejs", { message: 'You must log in to access that feature' });
  });

  /* Login */

  app.get("/login", (req, res) => {
    res.render("login.ejs", { message: null });
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
    res.render('home.ejs', {
      activeTab: 'home'
    })
  })

  // TODO: nest upload, preview, and update in a "listings" route
  app.get('/upload', (req, res) => {
    res.render('upload.ejs', {
      activeTab: 'upload'
    })
  })

  app.get('/preview', (req, res) => {
    res.render('preview.ejs', {
      activeTab: 'preview'
    })
  })

  app.get('/update', (req, res) => {
    res.render('update.ejs', {
      activeTab: 'update'
    })
  })

  app.get('/guide', (req, res) => {
    res.render('guide.ejs', {
      activeTab: 'guide'
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
