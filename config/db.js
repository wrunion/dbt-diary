const Pool = require("pg").Pool;
require("dotenv").config();

// Optional for local development; currently unused
const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // assigned by Heroku
    max: 4, // Limit to 4 concurrent connections; Free Heroku allows 20 postgres connections and 5 apps 
    ssl: { rejectUnauthorized: false }, // Avoids connection error
});

module.exports = pool;