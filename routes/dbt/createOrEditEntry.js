const asyncHandler = require('express-async-handler')
const db = require('../../db')

module.exports = router => {

  /* 
  * Create DBT entry
  * Requires: date (string), entry_type (string), entry (json)
  * Full route is /dbt/entry/create
  */
 
  router.post('/entry/create', asyncHandler(async(req, res) => {
    try {
      const { date, entry_type, entry } = req.body
      
      const queryString = `INSERT INTO entry (date, entry_type, entry) VALUES ($1, $2, $3) RETURNING *;`
      
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

  /* Edit entry tags */
  router.post('/entry/edit/tags', asyncHandler(async(req, res) => {
    try {

      const queryString = `UPDATE entry SET tags = $2 WHERE id = $1  RETURNING id, tags;`

      const { id, tags } = req.body
      
      const response = await db.query(queryString, [id, tags])

      return res.json({ 
        success: true,
        message: 'Entry updated!',
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
