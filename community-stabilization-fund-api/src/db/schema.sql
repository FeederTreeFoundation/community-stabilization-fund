-- Uncomment when creating your own database:

DROP DATABASE IF EXISTS csf_db;

CREATE DATABASE csf_db;
USE csf_db;

CREATE TABLE api_user ( 
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  name VARCHAR(20)
);

CREATE TABLE api_key (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  name VARCHAR(20),
  api_user_id INT, FOREIGN KEY (api_user_id) REFERENCES api_user(id) ON DELETE CASCADE
);

CREATE TABLE feminine_health_care (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    feminine_members INT NOT NULL,
    hygiene_items  VARCHAR(120) NULL,
    needs_plan_b BOOL
);
 
CREATE TABLE form_response (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  email VARCHAR(60) NULL,
  phone_number VARCHAR(15) NOT NULL,
  phone_type VARCHAR(7) NULL,
  address_id INT NULL UNIQUE,
  address_city VARCHAR(36) NULL,
  address_country VARCHAR(60) NULL,
  address_line1 VARCHAR(120) NULL,
  address_line2 VARCHAR(120) NULL,
  address_state VARCHAR(5) NULL,
  address_zip VARCHAR(10) NULL,
  is_black TINYINT NULL,
  is_local TINYINT NULL,
  packages_to_receive VARCHAR(120) NULL,
  has_flu_symptoms TINYINT NULL,
  household_members INT NULL,
  feminine_health_care_id INT NULL,
  item_requests VARCHAR(100) NULL,
  additional_information VARCHAR(120) NULL,
  is_pick_up TINYINT NULL,
  is_volunteering TINYINT NULL,
  is_subscribing TINYINT NULL,
  is_interested_in_membership TINYINT NULL,
  FOREIGN KEY (feminine_health_care_id) REFERENCES feminine_health_care(id) ON DELETE CASCADE
);

INSERT INTO api_user
(name)
VALUES
("foo");

INSERT INTO api_key
(name, api_user_id)
VALUES
("bar", 1);

INSERT INTO feminine_health_care
(id, feminine_members, hygiene_items, needs_plan_b)
VALUES
(1, 1, '["Thin Pads"]', TRUE);

INSERT INTO form_response
(id,first_name, last_name, email, phone_number, phone_type, packages_to_receive, address_id, is_black, is_local, has_flu_symptoms, household_members, feminine_health_care_id, item_requests, additional_information, is_pick_up, is_volunteering, is_subscribing, is_interested_in_membership)
VALUES
(1, "Malcolm", "Moses", "mm@gmail.com", "123-4567", "CELL", "Food, Cleaning/Health Supplies, Feminine Health Care, General Hygiene", 1, 1, 1, 1, 5, 1, "Nothing else", "Thank you for supporting!", 1, 1, 1, 1);

SELECT * FROM api_user;
SELECT * FROM api_key;
SELECT * FROM form_response;