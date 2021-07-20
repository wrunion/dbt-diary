/* This file has been manually created, and is for reference only */
/* To create or manipulate Postgres tables, checkout PG Admin or PSQL as ways to get started */
/* Heroku also has a CLI for interacting with Postgres. The command you need is in .env */

/* 
 * TODO: create a program to run this automatically 
 * once testing is complete
*/

/* 
 * this holds the user's config options 
 * it's also the table we run the 
 * database connection "sanity check against 
 */

-- sample insert statement for dbt_meta: 
-- INSERT INTO dbt_meta (data) VALUES ('{"your": "json", "data": "here"}') RETURNING *;

CREATE TABLE IF NOT EXISTS dbt_meta (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id character varying(180) NOT NULL DEFAULT 'winter',
  data json NOT NULL
);

CREATE TABLE IF NOT EXISTS dbt_data (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  data json NOT NULL
);

CREATE TABLE week (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
  week_number INTEGER NOT NULL, 
  module TEXT NOT NULL,
  skills TEXT NOT NULL, 
  homework TEXT, 
  personal json
); 

-- sample insert query 
INSERT INTO week (week_number, module, skills, homework, personal) VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- CREATE TABLE IF NOT EXISTS dbt_all (
--   id SERIAL PRIMARY KEY NOT NULL, 
--   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--   data json NOT NULL 
-- );

-------------------------------------

-- this is still in use for testing purposees. 
-- TODO: replace this table with the ones above, and configure the workflow
-- then update this file to remove this code  
CREATE TABLE IF NOT EXISTS dbt_data_test (
  id SERIAL PRIMARY KEY NOT NULL,
  date character varying(128) NOT NULL,
  timestamp character varying(128) NOT NULL,
  rating_data json,
  journal_data json, 
);

CREATE TABLE IF NOT EXISTS dbt_data_real (
  id SERIAL PRIMARY KEY NOT NULL,
  date character varying(128) NOT NULL,
  timestamp character varying(128) NOT NULL,
  rating_data json,
  journal_data json
);
