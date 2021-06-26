// /* Check for database connectivity and provide a human-friendly message on failure */
// const testDatabaseQuery = (pool) => {
//   pool.query(`SELECT test_field FROM production_meta`, (err, res) => {
//     if (err) {
//       console.error('Error connnecting to the database!');
//       if (process.env.DATABASE_URL === undefined || process.env.DATABASE_URL === null || process.env.DATABASE_URL === '') {
//         console.error('Please check that the DATABASE_URL environment variable is correct. See comments in nodeKeys.js for further information.');
//       }
//     }
//   });
// }

// module.exports = testDatabaseQuery;