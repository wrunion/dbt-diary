const asyncHandler = require('express-async-handler')
const db = require('../../db')

/* 
 * Route for fetching all "codewitch" entry data for DBT app
 * Full route is /dbt/entry/codewitch
*/

module.exports = router => {

  router.get('/entry/codewitch', asyncHandler(async(req, res) => {
    try {
      const queryString = `SELECT * FROM codewitch_entry ORDER BY timestamp;`
      const response = await db.query(queryString)
      const entries = response.rows;
      return res.json({
        success: true,
        data: entries
      })
    } catch (error) {
      return res.json({
        success: false,
        error: error
      })
    }
  }))

  // router.get('/entry/week', asyncHandler(async(req, res) => {
  //   try {
  //     const queryString = `SELECT * FROM entry WHERE DATE(date) >= now() - interval '9 days';`

  //     const response = await db.query(queryString)
      
  //     const entries = response.rows;
      
  //     return res.json({
  //       success: true,
  //       data: entries
  //     })
  //   } catch (err) {
  //     return res.json({
  //       success: false,
  //       error: error
  //     })
  //   }
  // }))

  // router.get('/entry/today', asyncHandler(async(req, res) => {
  //   try {
  //     const queryString = `SELECT * FROM entry WHERE DATE(date) = $1;`
  //     const now = new Date()
  //     const response = await db.query(queryString, [now])
      
  //     const entries = response.rows;
      
  //     return res.json({
  //       success: true,
  //       data: entries
  //     })
  //   } catch (err) {
  //     return res.json({
  //       success: false,
  //       error: err
  //     })
  //   }
  // }))

}