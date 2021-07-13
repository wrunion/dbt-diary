// router.get('/ratings', getConfig)
// router.post('/ratings', setConfig)
const db = require('./../../db')
const pool = db.pool
const utils = require('./../../utils/momentUtils')

/* for reference only -------------------

CREATE TABLE IF NOT EXISTS dbt_meta (
  id SERIAL PRIMARY KEY NOT NULL,
  date character varying(128) NOT NULL,
  config json NOT NULL,
  username character varying(128)
);

--------------------------------------- */

const insertConfigQuery = `INSERT INTO dbt_meta (date, config, username) VALUES ($1, $2, $3) RETURNING *`




const getConfigQuery = `SELECT config FROM dbt_meta WHERE username=$1;`

const getConfig = async (req, res) => {
  try {
    const username = req.username;
    const success = await pool.query(getConfigQuery, [username]);
    const data = success.rows[0]
    console.log(data)

    res.json({
      success: true,
      data: data
    })

  } catch (err) {
    console.error('getConfig error: ' + err) 
    res.json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}


module.exports = { getConfig } 