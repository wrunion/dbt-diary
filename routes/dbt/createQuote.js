const asyncHandler = require('express-async-handler')
const db = require('./../../db')

/* 
 * Route for daily quote and daily focus for DBT app
 * Requires: quote (string). Optional: source (string), focus (string)
 * Also accepts optional 'other' json arg
 * Full route is /dbt/quote/create
*/

const queryString = `INSERT INTO quote (quote, source, focus) VALUES ($1, $2, $3) RETURNING *;`

module.exports = router => {

  router.post('/quote/create', asyncHandler(async(req, res) => {
    try {
      const { quote, source, focus } = req.body
      
      const response = await db.query(queryString, [quote, source, focus])

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
}
