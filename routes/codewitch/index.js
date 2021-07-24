const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const db = require('./../../db')

const createEntryQuery = `INSERT INTO codewitch_entry (focus, tarot, journal, gratitude, moon_phase, self_care, other) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`
// We technically don't need asyncHandler here since we're "catching"
// errors ourselves, but that might change in the future
const createEntry = async (req, res) => {
  try {
    const { focus, tarot, journal, gratitude, moon_phase, self_care, other } = req.body
    
    const entry = await db.query(createEntryQuery, [focus, tarot, journal, gratitude, moon_phase, self_care, other])

    return res.json({ 
      success: true,
      message: 'Entry created!',
      entry: entry.rows[0]
    })
  } catch (err) {
    console.error(err.message)
    return res.json({ 
      success: false,
      error: err.message
    })
  }
}

/* 
 * Get all data from entry table
 * this includes both "rating" and "listing" data
*/
// const queryStringTest=`SELECT * FROM entry ORDER BY date;`

// const getEntriesAll = async (req, res) => {
//   try {
    
//     const response = await pool.query(queryStringTest)
//     const days = response.rows;

//     res.json({
//       success: true,
//       data: days
//     })

//   } catch (error) {
//     // console.log(error)
//     res.json({
//       success: false,
//       error: error
//     })
//   }
// }

// const queryString=`SELECT * FROM entry ORDER BY date;`


// const getDays = async (req, res) => {
//   try {
    
//     const response = await pool.query(queryString)
//     const days = response.rows;

//     res.json({
//       success: true,
//       data: days
//     })

//   } catch (error) {
//     // console.log(error)
//     res.json({
//       success: false,
//       error: error
//     })
//   }
// }

router.post('/entry/create', createEntry)


// TODO: look into error handling
// I get the error "next is not defined"
// which makes me think that this error handler isn't working
router.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.DEVELOPMENT === true ? err : {};

  res.status(err.status || 500);
  console.log('codewitch route: ', err.message)
});

module.exports = router