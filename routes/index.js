const express = require('express')
const router = express.Router()
// const insertData = require('./handlers')
const insertData = require('./handlers/insertData')
const { getDays, getTestDays } = require('./handlers/getDays')
const { getConfig } = require('./handlers/configHandlers')

/* Days */
router.get('/day', getTestDays)
router.get('/day/test', getTestDays)

router.post('/day', insertData)
router.post('/data', insertData)
router.post('/day/test', insertData)
router.post('/data/test', insertData)

router.post('/ratings', getDays)
router.post('/ratings/test', getDays)

// Config
router.get('/config', getConfig)
// router.post('/config', setConfig)



module.exports = router


