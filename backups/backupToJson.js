const db = require('../db')
const fs = require('fs')
/* This is called as an IFFE from server.js */
/* It runs on every server build */

const dataQuery = `SELECT * FROM dbt_data ORDER BY timestamp;`

const weekQuery = `SELECT * FROM week;`

const entryQuery = `SELECT * FROM entry ORDER BY date;`

const quoteQuery = `SELECT * FROM quote;`

const codewitchQuery =  `SELECT * FROM codewitch_entry ORDER BY timestamp;`

module.exports = () => {

  const queryData = async (queryString, fileName) => {
    try {
     
      const response = await db.query(queryString)
     
      const data = JSON.stringify(response.rows, null, 2)

      fs.writeFile(`./backups/files/${fileName}.json`, data, (err) => {
        if (err) throw err;
        console.log(`${fileName}.json created`)
    });

    } catch (err) {
      console.error(err.message)
    }
  }  
  /* Backup all four tables on server start */
  queryData(weekQuery, 'week')
  queryData(dataQuery, 'data')
  queryData(entryQuery, 'entry')
  queryData(quoteQuery, 'quote')
  queryData(codewitchQuery, 'codewitch_entry')
}