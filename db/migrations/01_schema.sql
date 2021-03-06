DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Jobs CASCADE;
DROP TABLE IF EXISTS Tasks CASCADE;

CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE Jobs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  notes TEXT,
  status VARCHAR(255) DEFAULT 'Quote Requested',
  estimate_total_time DECIMAL,
  estimate_total_workers INTEGER,
  estimate_travel_time DECIMAL,
  customer_first_name VARCHAR(255),
  customer_last_name VARCHAR(255),
  customer_address VARCHAR(255),
  customer_city VARCHAR(255),
  customer_phone_number VARCHAR(255),
  customer_email VARCHAR(255)
);

CREATE TABLE Tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);