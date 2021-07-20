const db = require('../db')
const fs = require('fs')
/* This is called as an IFFE from server.js */
/* It runs on every server build */

const dataQuery = `SELECT * FROM dbt_data ORDER BY timestamp;`

const weekQuery = `SELECT * FROM week;`

const entryQuery = `SELECT * FROM entry;`

const quoteQuery = `SELECT * FROM quote;`

module.exports = () => {

  const queryData = async (queryString, fileName) => {
    try {
     
      const response = await db.query(queryString)
     
      const data = JSON.stringify(response.rows, null, 2)

      fs.writeFile(`./backups/files/${fileName}.json`, data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    } catch (err) {
      console.error(err.message)
    }
  }  
  
  queryData(`SELECT id FROM week;`, 'week')

}