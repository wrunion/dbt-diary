/* This file has been manually created, and is for reference only */
/* To create or manipulate Postgres tables, checkout PG Admin or PSQL as ways to get started */
/* Heroku also has a CLI for interacting with Postgres. The command you need is in .env */

/* table to run sanity check against */
CREATE TABLE IF NOT EXISTS dbt_meta (
  test_field character varying(256)
);

CREATE TABLE IF NOT EXISTS dbt_data (
  id SERIAL PRIMARY KEY NOT NULL,
  date character varying(128) NOT NULL,
  weekday character varying(128),
  -- current_date NOT NULL,
  -- timestamp TIMEOFDAY() NOT NULL,
  rating_data json,
  journal_data json, 
  other_data json,
  gratitiude_list text
);

CREATE TABLE IF NOT EXISTS dbt_data_backup (
  id SERIAL PRIMARY KEY NOT NULL,
  date character varying(128) NOT NULL,
  weekday character varying(128),
  -- current_date NOT NULL,
  -- timestamp TIMEOFDAY() NOT NULL,
  rating_data json,
  journal_data json, 
  other_data json,
  gratitiude_list text
);
