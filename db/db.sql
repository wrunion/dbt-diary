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

-------------------------------------

CREATE TABLE IF NOT EXISTS dbt_data (
  id SERIAL PRIMARY KEY,
  date character varying(128) NOT NULL,
  timestamp character varying(128) NOT NULL,
  rating_data json,
  journal_data json
);

CREATE TABLE quote (
  id SERIAL PRIMARY KEY,
  date TIMESTAMP NOT NULL DEFAULT NOW(), 
  focus TEXT,
  quote TEXT NOT NULL,
  source TEXT,
  link TEXT,
  other json
);

-- spread, cards, meaning, daily_focus

CREATE TABLE tarot_draw (
  id SERIAL PRIMARY KEY,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
  spread TEXT, 
  cards TEXT, 
  meaning TEXT, 
  daily_focus TEXT,
  weekly_theme TEXT,
  full_draw json
);

-- table "entry" has fields: id, created_at, entry_type, entry, date
-- INSERT INTO codewitch (focus, tarot, journal, gratitude, moon_phase, self_care, other) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;

CREATE TABLE codewitch_entry (
  id SERIAL PRIMARY KEY, 
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(), 
  focus TEXT, 
  tarot TEXT, 
  journal TEXT, 
  gratitude TEXT, 
  moon_phase TEXT, 
  self_care TEXT,
  other TEXT,
  meta json
);

CREATE TYPE e_entry_type AS ENUM (
  'journal', 'rating', 'other'
)

-- TODO: go back and rework this
CREATE TABLE IF NOT EXISTS entry (
  id SERIAL PRIMARY KEY, 
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  entry_type e_entry_type NOT NULL,
  entry json NOT NULL,
  date VARCHAR(256),
  favorite BOOLEAN DEFAULT FALSE
);

CREATE TABLE entries_by_date (
  date VARCHAR(128) PRIMARY KEY,
  journal TIMESTAMP,
  rating TIMESTAMP,
  quote TIMESTAMP
);