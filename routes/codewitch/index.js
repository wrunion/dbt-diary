const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const createEntry = require('./createEntry')
/* 
 * Get all data from entry table
 * this includes both "rating" and "listing" data
*/
// const queryStringTest=`SELECT * FROM entry ORDER BY date;`

// const getEntriesAll = async (req, res) => {
//   try {
    
//     const response = await pool.query(queryStringTest)
//     const days = response.rows;

//     res.json({
//       success: true,
//       data: days
//     })

//   } catch (error) {
//     // console.log(error)
//     res.json({
//       success: false,
//       error: error
//     })
//   }
// }

// const queryString=`SELECT * FROM entry ORDER BY date;`


// const getDays = async (req, res) => {
//   try {
    
//     const response = await pool.query(queryString)
//     const days = response.rows;

//     res.json({
//       success: true,
//       data: days
//     })

//   } catch (error) {
//     // console.log(error)
//     res.json({
//       success: false,
//       error: error
//     })
//   }
// }

router.post('/entry/create', createEntry)


// TODO: look into error handling
// I get the error "next is not defined"
// which makes me think that this error handler isn't working
router.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.DEVELOPMENT === true ? err : {};

  res.status(err.status || 500);
  console.log('codewitch route: ', err.message)
});

module.exports = router