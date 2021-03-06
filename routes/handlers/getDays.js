const db = require('./../../db')
const utils = require('./../../utils/momentUtils')
const pool = db.pool

// const success = await pool.query(queryString, [date, timestamp, json]);
// const createdEntry = success.rows[0]

// get all data from test table
const queryStringTest=`SELECT * FROM dbt_data ORDER BY timestamp;`

const getTestDays = async (req, res) => {
  try {
    
    const response = await pool.query(queryStringTest)
    const days = response.rows;

    res.json({
      success: true,
      data: days
    })

  } catch (error) {
    // console.log(error)
    res.json({
      success: false,
      error: error
    })
  }
}

const queryString=`SELECT * FROM dbt_data;`

const getDays = async (req, res) => {
  try {
    
    const response = await pool.query(queryString)
    const days = response.rows;

    res.json({
      success: true,
      data: days
    })

  } catch (error) {
    // console.log(error)
    res.json({
      success: false,
      error: error
    })
  }
}

module.exports = { getTestDays, getDays } 