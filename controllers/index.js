const db = require('../db')
const pool = db.pool;

// timestamp formatted like: Jul 08 2021
const getFormattedDate = () => Date().split(' ').slice(1, 4).join(' ').toString()
const getWeekday = () => Date().split(' ')[0];

/* for the ratings data route */
const createEntry = async (req, res, queryString) => {
  try {
    if (!req.body) {
      res.json({
        success: false,
        error: 'No data received'
      })
    }

    const date = req.body.date;
    if (!date || typeof date !== 'string') {
      throw `Incorrect input type. "Date" should be a string`
    }

    const json = req.body.json;
    if (!json || typeof json !== 'object') {
      throw `Incorrect input type. "Data" should be an object` } 

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
}

module.exports = insertData