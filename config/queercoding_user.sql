/* This is for refence only, and must be manually executed to work*/

CREATE TABLE queercoding_user (
  user_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  password VARCHAR(128) NOT NULL,
  password_hint_1 VARCHAR(128),
  password_hint_2 VARCHAR(128)
);

CREATE TABLE production_user (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(128) NOT NULL,
  role VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  password VARCHAR(128) NOT NULL
);