DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  notes TEXT,
  status VARCHAR(255) DEFAULT 'Quote Requested',
  estimate_total_time INTEGER,
  estimate_total_workers INTEGER,
  estimate_travel_time INTEGER,
  customer_first_name VARCHAR(255),
  customer_last_name VARCHAR(255),
  customer_address VARCHAR(255),
  customer_city VARCHAR(255),
  customer_phone_number INTEGER,
  customer_email VARCHAR(255)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);