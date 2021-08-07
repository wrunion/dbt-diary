/* A function to keep the dbt_meta table up to date 
 * with the latest entry information 
*/
import db from './../db'

// CREATE TABLE entries_by_date (
//   date VARCHAR(128) PRIMARY KEY,
//   quote boolean,
//   journal_entry boolean,
//   rating_entry boolean,
//   timestamp TIMESTAMP NOT NULL DEFAULT NOW()
// );

module.exports = (type, date) => {
  try {
    switch(type) {
      case 'quote':
        db.query(`UPSERT INTO entries_by_date (date, quote)`, [date, true])
        return;
      case 'journal':
        db.query(`UPSERT INTO entries_by_date (date, journal_entry)`, [date, true])
        return;
      case 'rating':
        db.query(`UPSERT INTO entries_by_date (date, rating_entry)`, [date, true])
        return;
    }
  } catch (error) {
    console.error(error)
    return res.send(error.message)
  }
}