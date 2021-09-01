const db = require('../db')
const moment = require('moment')

/* 
 * This file exports a single function: getLastDate.
 * 
 * The function accepts a single string representing a DB table
 * 
 * String/table name must be one of:
    * 'backup'
    * 'rating'
    * 'journal'
    * 'quote'
    * 'week'
    * 'codewitch'
    * 'tarot'
 * 
 * Fn returns the last date that table was updated,
 * according to the dbt_meta Postgres table
 * 
 * Note: This is an async function and returns a promise
*/


/* 
 * createQueryString is a helper function for getLastDate.
 * It accepts a table name as a string 
 * It returns formatted query string 
 * 
 * Accepts the same argument string options as above.
*/

const createQueryString = tableName => {
  if (tableName === 'backup') {
    return `      
      SELECT date(last_backup) 
      FROM dbt_meta 
      WHERE date(last_backup) = date(now())`
  }
  return `      
    SELECT date(last_${tableName}) 
    FROM dbt_meta 
    WHERE date(last_${tableName}) = date(now())
    `
}

const getUpdatedToday = async () => {
  try {
    
  } catch (error) {
    console.log(error.message)
    return
  }
}

const tableUpdatedToday = async (tableName) => {
  try {

    const today = moment().format('YYYY-MM-DD')

    const queryString = createQueryString(tableName)

    const res = await db.query(queryString)

    const lastBackup = moment(res.rows[0].date).format('YYYY-MM-DD')   

    return (lastBackup === today)
  } catch (error) {
    console.log(error.message)
    return
  }
}

const getLastDate = async (tableName) => {
  try {
    const queryString = createQueryString(tableName)
    const res = await db.query(queryString)
    return res.rows[0].date
  } catch (error) {
    console.log(error.message)
    return
  }
}

module.exports = { getLastDate, tableUpdatedToday, getUpdatedToday } 