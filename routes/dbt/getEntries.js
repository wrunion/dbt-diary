const asyncHandler = require('express-async-handler')
const db = require('../../db')

/* 
 * Route for fetching all "entry" data for DBT app
 * Full route is /dbt/entry/all
*/

const queryString=`SELECT * FROM entry ORDER BY date;`

module.exports = router => {

  router.get('/entry/all', asyncHandler(async(req, res) => {
    try {
      const response = await db.query(queryString)
      const entries = response.rows;
      console.log(entries)
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

}


