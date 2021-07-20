const db = require('../../db')
const pool = db.pool
const utils = require('../../utils/momentUtils')
const moment = require('moment')

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

const ratingsQuery = `INSERT INTO dbt_data (date, timestamp, rating_data) VALUES ($1, $2, $3) RETURNING *`
const journalQuery = `INSERT INTO dbt_data (date, timestamp, journal_data) VALUES ($1, $2, $3) RETURNING *`

/* for the ratings data route */
const createEntry = async (req, res, queryString) => {
  try {

    const json = req.body.json;
    if (!json || typeof json !== 'object') {
      throw `Incorrect input type. "Data" should be an object` } 

    const date = moment().format('YYYY-MM-DD');
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
      error: 'Missing "type" property. Type property must be "ratings" or "journal"'
    })
    return;
  }

  if (type === 'ratings') {
    return createEntry(req, res, ratingsQuery);
  }
  if (type === 'journal') {
    return createEntry(req, res, journalQuery);
  }
  // If we reach this far, they entered a type, but it was wrong
  res.json({
    success: false,
    error: 'Entry "type" property must be "ratings" or "journal"'
  })
}

module.exports = insertData