const asyncHandler = require('express-async-handler')
const db = require('./../../db')

/* 
 * Accepts an entry id and flips the entry "favorite" property to true
*/

module.exports = router => {

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

  // router.post('/entry/favorite/toggle', asyncHandler(async(req, res) => {
  //   try {

  //     const queryString = `UPDATE entry SET favorite = NOT favorite WHERE id = $1  RETURNING id, favorite;`

  //     const { id } = req.body
      
  //     const response = await db.query(queryString, [id])

  //     return res.json({ 
  //       success: true,
  //       message: 'Entry updated!',
  //       entry: response.rows[0]
  //     })
  //   } catch (err) {
  //     console.error(err.message)
  //     return res.json({ 
  //       success: false,
  //       error: err.message
  //     })
  //   }
  // }))

}
