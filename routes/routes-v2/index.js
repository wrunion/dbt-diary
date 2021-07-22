const createEntry = require('./handlers/createEntry')
const asyncHandler = require('express-async-handler')
const express = require('express')
const router = express.Router()
const db = require('../../db')
  
router.get('/entry', (req, res) => {
  // console.log('create route')
  res.render('<h1>Create</h1>')
})

const createWeekQuery = `INSERT INTO week 
  (week_number, module, skills, homework, personal) 
  VALUES ($1, $2, $3, $4, $5) 
  RETURNING *;`

  // week no, module, skills are required
router.post('/api/week/create', asyncHandler(async (req, res) => {
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

router.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.DEVELOPMENT === true ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  console.log(err.message)
});

module.exports = router

