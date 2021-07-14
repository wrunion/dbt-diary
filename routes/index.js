const express = require('express')
const router = express.Router()
const insertData = require('./handlers')
const testInsertData = require('./handlers/testQuery')
const { getDays, getTestDays } = require('./handlers/getDays')
const { getConfig } = require('./handlers/configHandlers')

/* Days */
router.get('/day', getDays)
router.get('/day/test', getTestDays)

router.post('/day', insertData)
router.post('/data', insertData)
router.post('/day/test', testInsertData)
router.post('/data/test', testInsertData)

router.post('/ratings', getDays)
router.post('/ratings/test', getDays)

// Config
router.get('/config', getConfig)
// router.post('/config', setConfig)

/* Form */
// router.get('/form', (req, res) => {
//   try {
//     res.render('layout.ejs')
    
//   } catch (error) {
//     console.error(error.message)
//   }
// })

router.post('/form', (req, res) => {
  // const body = req.body
  console.log(req.body)
})



module.exports = router


