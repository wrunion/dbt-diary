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
const createEntry = async (req, res, queryString) => {
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

    // const success = await pool.query('INSERT INTO dbt_data (date, rating_data) VALUES ($1, $2) RETURNING *', [date, json]);
    const success = await pool.query(queryString, [date, json]);
    
    const createdEntry = success.rows[0]

    res.json({
      success: true,
      message: 'Entry created!',
      entry: createdEntry
    })

  } catch (err) {
    console.error('createEntry error: ' + err) 
    res.json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

// const insertJournalData = async (req, res) => {
//   try {
//     if (!req.body) {
//       res.json({
//         success: false,
//         error: 'No data received'
//       })
//     }

//     console.log(req.body)

//     const date = req.body.date;
//     if (!date || typeof date !== 'string') {
//       throw `Incorrect input type. "Date" should be a string`
//     }

//     const json = req.body.json;
//     if (!json || typeof json !== 'object') {
//       throw `Incorrect input type. "Data" should be an object` } 

//     const success = await pool.query('INSERT INTO dbt_data (date, rating_data) VALUES ($1, $2) RETURNING *', [date, json]);
    
//     const createdEntry = success.rows[0]

//     res.json({
//       success: true,
//       message: 'Daily data created!',
//       entry: createdEntry
//     })

//   } catch (err) {
//     console.error('insertRatingData error: ' + err) 
//     res.json({
//       success: false,
//       message: 'Something went wrong',
//       error: err
//     })
//   }
// }

// "type" represents which category of data sent from the client: 
// either data from the Ratings tab ({ type: "ratings" })
// or data from the Journal tab ({ type: "journal" }) 

const ratingsQuery = `INSERT INTO dbt_data (date, rating_data) VALUES ($1, $2) RETURNING *`
const journalQuery = `INSERT INTO dbt_data (date, journal_data) VALUES ($1, $2) RETURNING *`

const insertData = (req, res) => {
  const type = req.body?.type;
  if (!type) {
    res.json({
      success: false,
      error: 'Entry type property must be either "ratings" or "journal"'
    })
  }

  if (type === 'ratings') {
    return createEntry(req, res, ratingsQuery)
  } else if (type === 'journal') {
    return createEntry(req, res, journalQuery);
  } 
  // Do I need to call next() here? 
}

module.exports = insertData