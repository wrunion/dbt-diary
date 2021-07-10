const express = require('express')
const db = require('../db')
const router = express.Router()
const insertData = require('../controllers')
const testInsertData = require('../controllers/testQuery')

/* Days */
router.post('/day', insertData)
router.post('/data', insertData)
router.post('/day/test', testInsertData)
router.post('/data/test', testInsertData)
// router.get('/day', showDays)

module.exports = router


