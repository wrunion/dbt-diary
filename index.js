const express = require('express')
const app = express()
require('dotenv').config()
const passport = require('passport')
const path = require('path')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const helmet = require('helmet')
const compression = require("compression")
const ejs = require('ejs')
//const sslRedirect = require('heroku-ssl-redirect');
const { Pool } = require('pg')
const { testDatabaseQuery } = require('./utils')

const PORT = process.env.PORT || 5000


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

/* Configure view templates, which form the HTML part of the admin and login pages */
app.set("view engine", "ejs");
app.set('view options', {delimiter: '*'});

// Middleware for security and efficiency
app.use(cookieParser()); 
//app.use(sslRedirect()); // <-- this is crashing the app
app.use(express.json()) // necessary? allows us to access the req.body
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
};

/* Check for database connectivity and provide a human-friendly message on failure */
testDatabaseQuery(pool);


/* Routes */
require("./routes/admin")(app, pool);

app.listen(PORT, () => {
  console.log(`Server is ready at port ${PORT}`)
})