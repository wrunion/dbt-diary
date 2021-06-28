const express = require('express')
require('dotenv').config()
const passport = require('passport')
const path = require('path')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const helmet = require('helmet')
const compression = require("compression")
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express()
// const router = require("express-promise-router")()
app.disable('x-powered-by');

const PORT = process.env.PORT || 5050

let isProdEnvironment = false;

/* Configure view templates, which contain HTML, CSS & JS for the admin and login pages */
app.set('view engine', 'ejs');

// Middleware for security and efficiency
app.use(cookieParser()); 
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: false }));

/* Middleware */
app.use(compression({ filter: shouldCompress }))
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}
app.use(cors());
app.use(helmet.hidePoweredBy({ setTo: 'Blood, Sweat and Tears' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Allows us to access uploaded files in the req object 
app.use(fileUpload());
// app.use(router)

/* Serve public assets */
app.use(express.static(path.join(__dirname, "js")));

/* Custom middleware to set headers */
const setHeaders = (req, res, next) => {
  /* This allows us to use inline js without console errors */
  res.set("Content-Security-Policy", "script-src 'self' http://* 'unsafe-inline'")
  next();
}
app.use(setHeaders)

/* Routes */
require('./routes/user')(app);
require("./routes")(app);
require('./routes/pokemon')(app);

/* Catch all error handler */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(403).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is ready at port ${PORT}`)
})