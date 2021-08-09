const asyncHandler = require('express-async-handler')
const db = require('../../db')
  
module.exports = router => {

  const createWeekQuery = `INSERT INTO week 
    (week_number, module, skills, homework, personal) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;`

  router.post('/week/create', asyncHandler(async (req, res) => {
    try {
      const data = req.body
      // required fields
      const week_number = data.weekNumber 
      const module_name = data.module   
      const skills = data.skills   
      // not required
      const homework = data.homework || ''
      const personal = { experiences: data.experience || '' } 

      const entry = await db.query(createWeekQuery, [week_number, module_name, skills, homework, personal])

      res.json({
        success: true,
        message: 'Entry created!',
        entry: entry.rows[0]
      })
    } catch (error) {
      // next(error)
      console.log(error.message)
    }
  }))

}