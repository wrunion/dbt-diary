const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const compression = require("compression")
const ejs = require('ejs')
const cors = require('cors')
const movieRouter = require('./routes/movie-router.js')
const db = require('./mongo_db')
require('dotenv').config()

const app = express()
app.disable('x-powered-by');

const PORT = process.env.PORT || 8000

/* Middleware */
app.use(cookieParser()); 
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

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
app.use('/api', movieRouter)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

/* Global error handler */
app.use((err, req, res) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log(`Server is ready at port ${PORT}`)
})
