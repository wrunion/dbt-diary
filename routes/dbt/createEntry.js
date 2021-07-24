const asyncHandler = require('express-async-handler')
const db = require('./../../db')

/* 
 * Route for DBT app
 * Requires: date (string), entry_type (string), entry (json)
 * Full route is /dbt/entry/create
*/

const queryString = `INSERT INTO entry (date, entry_type, entry) VALUES ($1, $2, $3) RETURNING *;`

module.exports = router => {

  router.post('/entry/create', asyncHandler(async(req, res) => {
    try {
      const { date, entry_type, entry } = req.body
      
      const response = await db.query(queryString, [date, entry_type, entry])

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
