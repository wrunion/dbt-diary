const express = require('express')
const db = require('../db')
const router = express.Router()
const insertData = require('../controllers')

/* Days */
router.post('/day', insertData)
router.post('/data', insertData)

// router.get('/day', showDays)

module.exports = router


