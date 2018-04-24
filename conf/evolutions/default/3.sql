# --- !Ups

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  first_name CHARACTER VARYING,
  last_name CHARACTER VARYING,
  email CHARACTER VARYING,
  comment CHARACTER VARYING,
  search_since DATE,
  surface_min NUMERIC,
  rooms_min INTEGER,
  max_price NUMERIC,
  interest_zones TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE houses (
  id SERIAL PRIMARY KEY,
  address CHARACTER VARYING,
  post_code CHARACTER VARYING,
  town CHARACTER VARYING,
  country CHARACTER VARYING,
  latitude NUMERIC,
  longitude NUMERIC,
  surface NUMERIC,
  rooms INTEGER,
  price NUMERIC,
  negociation BOOLEAN,
  comment CHARACTER VARYING,
  to_sell_since DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);



# --- !Downs

DROP TABLE clients;
DROP TABLE houses;