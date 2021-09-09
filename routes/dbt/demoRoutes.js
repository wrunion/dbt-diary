const asyncHandler = require('express-async-handler')
const db = require('../../db')

module.exports = router => {

  /* 
  * Create DEMO DBT entry
  * Requires: date (string), entry_type (string), entry (json)
  * Full route is /dbt/entry/create
  */
 
  router.post('/demo/entry/create', asyncHandler(async(req, res) => {
    try {
      const { date, entry_type, entry, tags } = req.body
      
      const queryString = `INSERT INTO demo (date, entry_type, entry, tags) VALUES ($1, $2, $3, $4) RETURNING *;`
      
      const response = await db.query(queryString, [date, entry_type, entry, tags])

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
  router.post('/demo/entry/edit/tags', asyncHandler(async(req, res) => {
    try {

      const queryString = `UPDATE demo SET tags = $2 WHERE id = $1  RETURNING id, tags;`

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

  /* GET routes ----------------------------------------- */
  router.get('/demo/entry/all', asyncHandler(async(req, res) => {
    try {
      const queryString = `SELECT * FROM demo ORDER BY date;`
      const response = await db.query(queryString)
      const entries = response.rows;

      return res.json({
        success: true,
        data: entries
      })
    } catch (err) {
      return res.json({
        success: false,
        error: error
      })
    }
  }))

  router.get('/demo/entry/week', asyncHandler(async(req, res) => {
    try {
      const queryString = `SELECT * FROM demo WHERE DATE(date) >= now() - interval '9 days';`

      const response = await db.query(queryString)
      
      const entries = response.rows;
      
      return res.json({
        success: true,
        data: entries
      })
    } catch (err) {
      return res.json({
        success: false,
        error: error
      })
    }
  }))

  router.get('/demo/entry/today', asyncHandler(async(req, res) => {
    try {
      const queryString = `SELECT * FROM demo WHERE DATE(date) = $1;`
      const now = new Date()
      const response = await db.query(queryString, [now])
      
      const entries = response.rows;
      
      return res.json({
        success: true,
        data: entries
      })
    } catch (err) {
      return res.json({
        success: false,
        error: err
      })
    }
  }))

  /* Actions related to the "favorite" column */
  router.post('/entry/favorite', asyncHandler(async(req, res) => {
    try {

      const queryString = `UPDATE demo SET favorite = true WHERE id = $1  RETURNING *;`

      const { id } = req.body
      
      const response = await db.query(queryString, [id])

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

  router.post('/entry/favorite/toggle', asyncHandler(async(req, res) => {
    try {

      const queryString = `UPDATE demo SET favorite = NOT favorite WHERE id = $1  RETURNING id, favorite;`

      const { id } = req.body
      
      const response = await db.query(queryString, [id])

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
