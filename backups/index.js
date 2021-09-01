const backupToJson = require('./backupToJson')
const createBackupTables = require('./createBackupTables')
const db = require('../db')
const moment = require('moment')
const { getLastDate } = require('../utils/getLastDate')

module.exports = async () => {
  try {
    const today = moment().format('YYYY-MM-DD')
    const lastBackup = await getLastDate('backup')
    const lastBackupDate = moment(lastBackup).format('YYYY-MM-DD')
    // We only want to back up once a day
    if (today !== lastBackupDate) { 
      // Backup files, create backup tables
      backupToJson()
      createBackupTables()
      // Update the meta table
      db.query(`
        UPDATE dbt_meta 
        SET last_backup = now()
        WHERE id = 1;
      `) 
      return
    }  
  } catch (error) {
    console.log(error.message)
    return
  }
} 
