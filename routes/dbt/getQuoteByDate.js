const asyncHandler = require('express-async-handler')
const db = require('../../db')

/* 
 * Route to get quote by date
*/

// TODO: This doesn't take arguments yet. Research & implement feature

const queryString = `SELECT quote, source, focus FROM quote WHERE date >= CURRENT_DATE AND date <= CURRENT_DATE + INTERVAL '1 day';`

module.exports = router => {

  router.get('/quote', asyncHandler(async(req, res) => {
    try {
      // const { date } = req.body
      const response = await db.query(queryString)

      if (response.rows) {
        res.json({ 
          success: true,
          data: response.rows
        })
      } else {
        return res.json({
          data: null,
          message: 'No quote found for that date'
        })
      }
    } catch (err) {
      console.error(err.message)
      return res.json({ 
        data: null,
        error: err.message
      })
    }
  }))
}
