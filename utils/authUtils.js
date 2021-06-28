/* Utils for creating and authenticating users */
exports.getUser = async (email, db) => {
  const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);

  // This is unnecessarily long, I know, but my version of node won't let me use the "res?.rows" syntax, so it's necessary until I can upgrade
  /* If no user, return false */
  if (!res || !res.rows || res.rows.length < 1) { return false; }
  // the pg response object returns the data in the "rows" array object
  // in this case, there should only be one row
  /* If user, return user */
  return(res.rows[0]);
}

/* Change password */
// const changePassword = async (email, password, db) => {
//   await db.query(`SELECT change_password($1, $2)`, [email, password], async (err, result) => {
//     if (err) {
//       console.error('Error executing query ', err.stack);
//     }
//   });
// }