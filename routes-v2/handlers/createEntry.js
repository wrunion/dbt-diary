const moment = require('moment')
const db = require('./../../db')

// CREATE TABLE IF NOT EXISTS entry (
//   id SERIAL PRIMARY KEY, 
//   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//   entry_type e_entry_type NOT NULL,
//   entry json NOT NULL,
//   date VARCHAR(256)
// );

// CREATE TABLE IF NOT EXISTS day (
//   id SERIAL PRIMARY KEY, 
//   date VARCHAR(256) NOT NULL,
//   entries TEXT, 
//   focus_phrase TEXT
// );

const createOrUpdateDayString = `INSERT INTO day (date, focus_phrase) VALUES ($1, $2) RETURNING *`
const createEntryString = `INSERT INTO entry (entry_type, entry, date) VALUES ($1, $2, $3) RETURNING *`

const createEntry = async (req, res, next) => {
  try {

    if (!req.body) throw { name: `No Data Recieved`, message: `No data recieved. Please check inputs and try again` }

    const entry_type = req.body.entryType
    if (!entry_type || typeof entry_type !== 'string') 
      throw { name: `Missing or Incorrect Data`, message: `"entryType" field must be a string with value journal, rating, or other` }

    const entry = req.body.entry
    if (!entry || typeof json !== 'object') 
      throw { name: `Missing or Incorrect Data`, message: `entry must be a valid JavaScript object`
    }
    // If the user didn't provide a date, we stamp it here 
    const date = entry.date || moment().format('YYYY MM DD')

    // If we've reached this far, we have enough valid data
    // to create a new listing. 

    const createdEntry = await db.query(`INSERT INTO entry (entry_type, entry, date) VALUES ($1, $2, $3) RETURNING *`, [entry_type, entry, date])

    // TODO: add to or update "day" table as well

    res.json({
      success: true,
      entry: createdEntry
    })

  } catch (error) {
    switch (error.name) {
      case `No Data Recieved`:
      case `Missing or Incorrect Data`:
        res.status(415).json({
          success: false, 
          message: error.message
        })
        break
        default:
      console.error(error)
      next(error)
    }
  }
}

module.exports = createEntry