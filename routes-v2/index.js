const createEntry = require('./handlers/createEntry')
const asyncHandler = require('express-async-handler')
const express = require('express')
const router = express.Router()

  
router.get('/entry', (req, res) => {
  // console.log('create route')
  res.render('<h1>Create</h1>')
})

// app.post('/entry/create', createEntry)


module.exports = router

