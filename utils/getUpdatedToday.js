const db = require('./../db')

module.exports = async () => {
  try {
    // Set correct timezone, since this depends on the Heroku server
    // and can change
    await db.query(`SET TIMEZONE TO 'America/Los_Angeles'`)

    const response = await db.query('SELECT type FROM meta WHERE date(date) = date(now());')
    // Returns an array of the tables that have been updated today
    console.log(response.rows.map(item => item.type))
    return response.rows.map(item => item.type) 
  } catch (error) {
    console.log(error.message)
    return
  }
}