const db = require('../db')
const pool = db.pool;

/* 
 * IF TABLE SCHEMA CHANGES
 * CHANGE IT HERE
*/
// const dropTableString = `DROP TABLE IF EXISTS listings`
// const createListingsTableString = `CREATE TABLE listings (
//   id VARCHAR(256) PRIMARY KEY NOT NULL,
//   name VARCHAR(256) NOT NULL,
//   category VARCHAR(256) NOT NULL,
//   website VARCHAR(256),
//   street_address VARCHAR(256)
// );`


// const createListingsTable = async () => {
//   try {
//     await db.query(dropTableString)
//     await db.query(createListingsTableString)
//     // if the code has reached this point, 
//     // database calls were successful
//     return(true)
//   } catch (err) {
//     console.log('create listings error: ' + err)
//     return err.message;
//     // TODO: if this is used in a route, call next(error) here 
//   }
// }

/* for the ratings data route */
const insertRatingData = async (req, res) => {
  try {
    if (!req.body) {
      res.json({
        success: false,
        error: 'No data received'
      })
    }

    console.log(req.body)

    const date = req.body.date;
    if (!date || typeof date !== 'string') {
      throw `Incorrect input type. "Date" should be a string`
    }

    const json = req.body.json;
    if (!json || typeof json !== 'object') {
      throw `Incorrect input type. "Data" should be an object` } 

    const success = await pool.query('INSERT INTO dbt_data (date, rating_data) VALUES ($1, $2) RETURNING *', [date, json]);
    
    const createdEntry = success.rows[0]

    res.json({
      success: true,
      message: 'Daily data created!',
      entry: createdEntry
    })

  } catch (err) {
    console.error('insertRatingData error: ' + err) 
    res.json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

module.exports = insertRatingData