/* This is the only place in the app we interact directly with the db */
/* All other files should use these functions for db calls */
/* No other file should directly call 'pg', Pool, etc. Import that functionality from here instead */

const { Pool } = require('pg')
const pool = new Pool()

module.exports = {

  asyncQuery: (text, params) => pool.query(text, params),

  callbackQuery: (text, params, callback) => pool.query(text, params, callback),

  // For debugging
  queryWithLogging: async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  }

}
