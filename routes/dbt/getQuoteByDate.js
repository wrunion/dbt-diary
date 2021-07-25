const asyncHandler = require('express-async-handler')
const db = require('../../db')
const moment = require('moment')
/* 
 * Route to get quote by date
*/

const queryString = `SELECT quote, source, focus, link FROM quote WHERE DATE(date) = $1;`

module.exports = router => {

  router.get('/quote', asyncHandler(async(req, res) => {
    try {

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
      console.error(err.message)
      return res.json({ 
        data: null,
        error: err.message
      })
    }
  }))
}
