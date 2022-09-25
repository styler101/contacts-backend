CREATE DATABASE mycontacts;

CREATE EXTENSTION IF NOT EXISTS 'uuid-ossp';

CREATE TABLE categories(
  id UUID NOT NULL PRIMARY KEY UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);


CREATE TABLE IF NOT EXISTS contacts(
  id UUID NOT NULL PRIMARY KEY UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  category_id UUID,
  FOREIGN KEY(category_id) REFERENCES categories(id)
);
