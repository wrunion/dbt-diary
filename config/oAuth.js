// Mongoose & Passport App Config
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./keys')
const xClacksOverhead = require('../middleware/xClacksOverhead')

// REQUIRE **ALL** MONGOOSE MODELS HERE
require('../models/User')
// Passport
require('./passport') 

module.exports = app => {

  mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  // Obligatory tribute to Terry Pratchett
  // For a man is not dead while his name is still spoken
  app.use(xClacksOverhead)
}