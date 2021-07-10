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
  timestamp character varying(128),
  rating_data json,
  journal_data json
);

CREATE TABLE IF NOT EXISTS dbt_data_test (
  id SERIAL PRIMARY KEY NOT NULL,
  date character varying(128) NOT NULL,
  timestamp character varying(128),
  rating_data json,
  journal_data json
);

