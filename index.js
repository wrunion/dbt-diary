const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const passport = require('passport')
const path = require('path')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// logs requests 
const ejs = require('ejs')

/* CONNECT TO DB HERE */
// then:
// require('./config/passport')(passport);

app.use(cookieParser()); 
app.use(express.json()) // necessary? allows us to access the req.body

app.set('view engine', 'ejs');

if (process.env.NODE_ENV === "production") {
  // Heroku serves our static content
  app.use(express.static(path.join(__dirname, "client/build")));
};


/*--- PASSPORT SETUP -----*/
// TODO: set all this up in a route instead? 
app.use(session(
  { resave: false, 
    saveUninitialized: true, 
    secret: 'piper' 
  })
);
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// TODO: see if i need the lines below
// app.use(express.cookieParser('keyboard cat'));
// app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.listen(PORT, () => {
  console.log(`Server is ready at port ${PORT}`)
})