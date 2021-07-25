const asyncHandler = require('express-async-handler')
const db = require('./../../db')

/* 
 * Route for daily tarot draw
 * Accepts args for spread, cards (json, required), 
 * meaning, daily_focus, and weekly_theme. 
 * All fields are optional TEXT w/no characte limit
 * Except full_draw with is optional json 
 * Full route is /tarot/draw/create
*/

module.exports = router => {

  const queryString = `INSERT INTO tarot_draw (spread, cards, meaning, daily_focus, weekly_theme) VALUES ($1, $2, $3, $4) RETURNING *;`

  router.post('/draw/create', asyncHandler(async(req, res) => {
    try {
      const { spread, cards, meaning, daily_focus, weekly_theme } = req.body
      
      const response = await db.query(queryString, [spread, cards, meaning, daily_focus, weekly_theme])

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
