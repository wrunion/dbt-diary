/* This file has been manually created, and is for reference only */
/* To create or manipulate Postgres tables, checkout PG Admin or PSQL as ways to get started */
/* Heroku also has a CLI for interacting with Postgres. The command you need is in .env */

/* Contains data related to the production data set */
CREATE TABLE IF NOT EXISTS production_meta (
  test_field character varying(256)
);

CREATE TABLE IF NOT EXISTS development_user (
  id SERIAL PRIMARY KEY NOT NULL,
  name character varying(256) NOT NULL,
  role character varying(256) NOT NULL,
  email character varying(256) NOT NULL, 
  password character varying(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS production_user (
  id SERIAL PRIMARY KEY NOT NULL,
  name character varying(256) NOT NULL,
  role character varying(256) NOT NULL,
  email character varying(256) NOT NULL, 
  password character varying(256) NOT NULL
);