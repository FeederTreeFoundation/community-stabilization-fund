DROP DATABASE IF EXISTS csf_db;

CREATE DATABASE csf_db;
USE csf_db;

CREATE TABLE users ( 
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  name VARCHAR(20)
);

CREATE TABLE api_keys (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  name VARCHAR(20),
  user_id INT, FOREIGN KEY (user_id) REFERENCES users(id)
);
 
CREATE TABLE form_responses (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  email VARCHAR(60) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  phone_type VARCHAR(7) NULL,
  address_id INT NOT NULL UNIQUE,
  is_black TINYINT NULL,
  is_local TINYINT NULL,
  has_flu_symptoms TINYINT NULL,
  household_members INT NULL,
  feminine_health_care_id INT NULL,
  item_requests VARCHAR(100) NULL,
  additional_information VARCHAR(120) NULL,
  is_pick_up TINYINT NULL,
  is_volunteering TINYINT NULL,
  is_subscribing TINYINT NULL,
  is_interested_in_membership TINYINT NULL
);

INSERT INTO users
(name)
VALUES
("foo");

INSERT INTO api_keys
(name, user_id)
VALUES
("bar", 1);

INSERT INTO form_responses
(id,first_name, last_name, email, phone_number, phone_type, address_id, is_black, is_local, has_flu_symptoms, household_members, feminine_health_care_id, item_requests, additional_information, is_pick_up, is_volunteering, is_subscribing, is_interested_in_membership)
VALUES
(1, "Malcolm", "Moses", "mm@gmail.com", "123-4567", "CELL", 1, 1, 1, 1, 5, 1, "Nothing else", "Thank you for supporting!", 1, 1, 1, 1);

SELECT * FROM users;
SELECT * FROM api_keys;
SELECT * FROM form_responses;