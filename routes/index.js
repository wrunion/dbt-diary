const express = require('express')
const db = require('../db')
const router = express.Router()
const insertData = require('../controllers')
const testInsertData = require('../controllers/testQuery')
const { getDays, getTestDays } = require('./../controllers/getDays')


/* Days */
router.get('/day', getDays)
router.get('/day/test', getTestDays)

router.post('/day', insertData)
router.post('/data', insertData)
router.post('/day/test', testInsertData)
router.post('/data/test', testInsertData)

router.post('/ratings', getDays)
router.post('/ratings/test', getDays)


module.exports = router


