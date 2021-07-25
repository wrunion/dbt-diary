const asyncHandler = require('express-async-handler')
const db = require('./../../db')

/* 
 * Route for daily quote and daily focus for DBT app
 * Requires: quote (string). Optional: source (string), focus (string)
 * Also accepts optional 'other' json arg
 * Full route is /dbt/quote/create
*/

const queryString = `INSERT INTO quote (quote, source, focus, link) VALUES ($1, $2, $3, $4) RETURNING *;`

module.exports = router => {

  router.post('/quote/create', asyncHandler(async(req, res) => {
    try {
      const { focus, quote, source, link } = req.body
      
      const response = await db.query(queryString, [quote, source, focus, link])

      return res.json({ 
        success: true,
        message: 'Entry created!',
        entry: response.rows[0]
      })
    } catch (err) {
      console.error(err.message)
      return res.json({ 
        success: false,
        error: err.message
      })
    }
  }))

  /* To record a daily tarot draw */
  const queryString = `INSERT INTO quote (spread, cards, meaning, daily_focus) VALUES ($1, $2, $3, $4) RETURNING *;`

  router.post('/draw/create', asyncHandler(async(req, res) => {
    try {
      const { spread, cards, meaning, daily_focus } = req.body
      
      const response = await db.query(queryString, [spread, cards, meaning, daily_focus])

      return res.json({ 
        success: true,
        message: 'Draw created!',
        draw: response.rows[0]
      })
    } catch (err) {
      console.error(err.message)
      return res.json({ 
        success: false,
        error: err.message
      })
    }
  }))


}
