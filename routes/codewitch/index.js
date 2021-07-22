const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const db = require('./../../db')

const createEntryQuery = `INSERT INTO codewitch (focus, tarot, journal, gratitude, moon_phase, self_care, other) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`
// We technically don't need asyncHandler here since we're "catching"
// errors ourselves, but that might change in the future
router.post('/entry/create', asyncHandler((req, res) => {
  try {
    console.log(req.body)

    const { focus, tarot, journal, gratitude, moon_phase, self_care, other } = req.body
    
    const entry = db.query(createEntryQuery, [focus, tarot, journal, gratitude, moon_phase, self_care, other])
  
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
}))



router.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.DEVELOPMENT === true ? err : {};

  res.status(err.status || 500);
  console.log('codewitch route: ', err.message)
});

module.exports = router