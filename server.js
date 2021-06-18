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
const testDatabaseQuery = require('./utils/pgUtils')
const cors = require('cors')
const app = express()
app.disable('x-powered-by');

const { Pool } = require('pg')

const PORT = process.env.PORT || 5050

let isProdEnvironment = false;

/* Heroku free postgres allows up to 20 concurrent connections */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  ssl: { rejectUnauthorized: false }
});

pool.on('error', async (error, client) => {
  if (process.env.NODE_ENV === undefined || process.env.NODE_ENV !== "production") {
    console.error(`Database pool error: ${error}; Connection string: ${process.env.DATABASE_URL}`);
  }
});

/* Configure view templates, which contain HTML, CSS & JS for the admin and login pages */
app.set('view engine', 'ejs');

// Middleware for security and efficiency
// app.use(cookieParser()); 
// //app.use(sslRedirect()); // <-- this is crashing the app
// app.use(express.json()) 
// app.use(helmet());
// app.use(compression());
// app.use(express.urlencoded({ extended: false }));

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
app.use(function(req, res, next) {
  /* Add Cache-Control headers to all requests */
  const expireAfterMinutes = 60;
  const cacheControlHeaderValue = isProdEnvironment
    ? `public, max-age=${expireAfterMinutes/2 * 60}, stale-while-revalidate=${expireAfterMinutes/2 * 60}`
    : `no-cache`
  res.header('Cache-Control', cacheControlHeaderValue);
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
};

/* Routes */
require("./routes")(app, pool);

/* Check for database connectivity and provide a human-friendly message on failure */
testDatabaseQuery(pool);

app.listen(PORT, () => {
  console.log(`Server is ready at port ${PORT}`)
})