const db = require('./../../db')
const pool = db.pool
const utils = require('./../../utils/momentUtils')


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

const insertDataQuery = `INSERT INTO dbt_all (data) VALUES ($1) RETURNING *`
const insertMetaQuery = `INSERT INTO dbt_meta (data) VALUES ($1) RETURNING *`

const retrieveMetaQuery = `SELECT * FROM dbt_meta WHERE user_id = $1`
const retrieveDataQuery = `SELECT * FROM dbt_all`

exports.insertData = async (req, res, queryString) => {
  try {
    const data = req.body.data

    const success = await pool.query(queryString, [data]);
    const createdEntry = success.rows[0]?.data?.entry;

    res.json({
      success: true,
      message: 'Entry created!',
      entry: createdEntry
    })
  } catch (error) {
    console.error('createEntry error: ' + err) 
    res.json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

// select top one order by date

const retrieveData = async (req, res, queryString) => {
  try {
    const data = req.body.data

    const response = await pool.query(queryString, [data]);
    /* Grab the most recent entry available */
    const responseData = success.rows[success.rows.length -1];

    res.json({
      success: true,
      entry: responseData
    })
  } catch (error) {
    console.error('retrieveData error: ' + err) 
    res.json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}
