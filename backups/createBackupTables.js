const db = require('../db')

const backupPrimaryTable = `
  DROP TABLE IF EXISTS backup_dbt_data;
  CREATE TABLE backup_dbt_data AS TABLE dbt_data;`

const backupWeek = `DROP TABLE IF EXISTS backup_week;
  CREATE TABLE backup_week AS TABLE week;`

const backupEntry = `DROP TABLE IF EXISTS backup_entry;
  CREATE TABLE backup_entry AS TABLE entry;`

const backupQuote = `DROP TABLE IF EXISTS backup_quote;
  CREATE TABLE backup_quote AS TABLE quote;`

const backupCodewitch = `DROP TABLE IF EXISTS backup_codewitch_entry;
CREATE TABLE backup_codewitch_entry AS TABLE codewitch_entry;`

module.exports = () => {
  
  (async () => {
    try {

      console.log('Backing up data...')

      await db.query(backupPrimaryTable) 
      await db.query(backupWeek) 
      await db.query(backupEntry) 
      await db.query(backupQuote) 
      await db.query(backupCodewitch)

      console.log('Backup complete!')

    } catch (error) {
      console.error(error.message)
    }
  })()


}