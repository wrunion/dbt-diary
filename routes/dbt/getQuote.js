const asyncHandler = require('express-async-handler')
const db = require('../../db')
const moment = require('moment')
/* 
 * Route to get quote by date
*/


module.exports = router => {
  /* Get quotes from current date */
  router.get('/quote', asyncHandler(async(req, res) => {
    try {
      const queryString = `SELECT quote, source, focus, link FROM quote WHERE DATE(date) = $1;`
      const formattedDate = moment().format('YYYY, MM DD');
      const response = await db.query(queryString, [formattedDate])

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
      return res.json({ 
        data: null,
        error: err.message
      })
    }
  }))

  /* Get all quotes */
  router.get('/quote/all', asyncHandler(async(req, res) => {
    try {
      const queryString = `SELECT * FROM quote;`
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
      return res.json({ 
        data: null,
        error: err.message
      })
    }
  }))
}
