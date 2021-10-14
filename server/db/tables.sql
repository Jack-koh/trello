--users table
CREATE TABLE users (
  user_no SERIAL PRIMARY KEY,
  user_email VARCHAR(50) UNIQUE NOT NULL,
  user_password TEXT NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  reg_date double precision
);

-- boards table
CREATE TABLE boards (
  board_no SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  background_type VARCHAR(10),
  background_name VARCHAR(20),
  favorite boolean NOT NULL,
  reg_date double precision
);

--link_users_boards table
CREATE TABLE link_users_boards (
  user_no integer NOT NULL,
  board_no integer NOT NULL
);

CREATE TABLE trellos (
  trello_no SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  reg_date double precision,
  board_no integer REFERENCES boards ON DELETE CASCADE
);

CREATE TABLE trellos_order (
  board_no integer NOT NULL,
  list_order text
);

CREATE TABLE cards (
  card_no SERIAL PRIMARY KEY,
  card_title VARCHAR(100) NOT NULL,
  label VARCHAR(20),
  description TEXT,
  reg_date double precision,
  trello_no integer REFERENCES trellos ON DELETE CASCADE
);

CREATE TABLE cards_order (
  trello_no integer NOT NULL,
  list_order text
)