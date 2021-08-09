/* This file has been manually created, and is for reference only */
/* To create or manipulate Postgres tables, checkout PG Admin or PSQL as ways to get started */
/* Heroku also has a CLI for interacting with Postgres. The command you need is in .env */

/* 
 * TODO: create a program to run this automatically 
 * once testing is complete
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

CREATE TABLE IF NOT EXISTS entry (
  id SERIAL PRIMARY KEY, 
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  entry_type e_entry_type NOT NULL,
  entry json NOT NULL,
  date VARCHAR(256),
  favorite BOOLEAN DEFAULT FALSE
);

-- metadata for all of the above 
CREATE TABLE dbt_meta (
	id SERIAL PRIMARY KEY,
	last_backup TIMESTAMPTZ, 
	last_journal TIMESTAMPTZ,
	last_rating TIMESTAMPTZ,
	last_quote TIMESTAMPTZ,
	last_week TIMESTAMPTZ,
	last_codewitch_entry TIMESTAMPTZ,
	last_tarot_draw TIMESTAMPTZ
);

CREATE TABLE meta (
	id SERIAL PRIMARY KEY,
	date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	type VARCHAR(128) NOT NULL
);