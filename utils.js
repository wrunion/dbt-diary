const testDatabaseQuery = (pool) => {
  pool.query(`SELECT * from production_user`, (err, res) => {
    if (err) {
      console.error('Error connnecting to the database!');
      if (process.env.DATABASE_URL === undefined || process.env.DATABASE_URL === null || process.env.DATABASE_URL === '') {
        console.error('Please check that the DATABASE_URL environment variable is correct.');
      }
    }
  });
}

module.exports = { testDatabaseQuery }