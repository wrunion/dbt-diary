const express = require('express')
const db = require('./../db')
const router = express.Router()
const insertRatingData = require('./../controllers/day.js')

// timestamp formatted like: Jul 08 2021
const getFormattedDate = () => Date().split(' ').slice(1, 4).join(' ').toString()
const getWeekday = () => Date().split(' ')[0];

// const insertData = async (req, res) => {
//   try {
//     const date = getFormattedDate();
//     const weekday = getWeekday();
//     const body = req.body;

//     if (!body) {
//       return res.status(400).json({
//         success: false,
//         error: 'No data received. Please verify input and try again',
//       })
//     }

//     const entry = { ...body, date: date, day: weekday }


//     // const day = new Day(entry)
//     if (!day) {
//       return res.status(400).json({ success: false, error: err })
//     }

//     day.save().then(() => {
//       return res.status(201).json({
//         success: true,
//         message: 'Entry created!',
//         })
//       }).catch(error => {
//         return res.status(400).json({
//           error,
//           message: 'Entry not created. Please see error message',
//         })
//       })
//   } catch (error) {
//     console.error(error)
//   }
// }

console.log(insertRatingData)

/* Days */
router.post('/day', insertRatingData)
// router.get('/day', showDays)
router.get('/test', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

module.exports = router


