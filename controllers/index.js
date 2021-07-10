const db = require('../db')
const pool = db.pool
const utils = require('./../utils/momentUtils')

/* --------- for reference only ----------- */

// CREATE TABLE IF NOT EXISTS dbt_data (
//   id SERIAL PRIMARY KEY NOT NULL,
//   weekday character varying(128) NOT NULL,
//   date character varying(128) NOT NULL,
//   timestamp character varying(128),
//   rating_data json,
//   journal_data json
// );

/* ----------------------------------------- */

const ratingsQuery = `INSERT INTO dbt_data_test (date, timestamp, rating_data) VALUES ($1, $2, $3) RETURNING *`
const journalQuery = `INSERT INTO dbt_data_test (date, timestamp, journal_data) VALUES ($1, $2, $3) RETURNING *`

/* for the ratings data route */
const createEntry = async (req, res, queryString) => {
  try {

    const json = req.body.json;
    if (!json || typeof json !== 'object') {
      throw `Incorrect input type. "Data" should be an object` } 

    const date = utils.date;
    const timestamp = utils.id;

    const success = await pool.query(queryString, [date, timestamp, json]);
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


const insertData = (req, res) => {
  if (!req.body) {
    res.json({
      success: false,
      error: 'No data received'
    })
  }

  const type = req.body?.type;
  // "type" represents which category of data sent from the client: 
  // either data from the Ratings tab ({ type: "ratings" })
  // or data from the Journal tab ({ type: "journal" }) 
  if (!type) {
    res.json({
      success: false,
      error: 'Entry type property must be either "ratings" or "journal"'
    })
  }
  
  type === 'ratings' && createEntry(req, res, ratingsQuery);
  type === 'journal' && createEntry(req, res, journalQuery);
  // We don't error handle here, since we have a 
  // global error handler for sync functions
}

module.exports = insertData