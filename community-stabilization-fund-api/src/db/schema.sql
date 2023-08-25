-- Currently Prisma is handling creating the schema,
-- while this file populates the database with seed data.
-- If creating your own database, uncomment the rest of this file:

-- DROP DATABASE IF EXISTS csf_db;

-- CREATE DATABASE csf_db;
USE csf_db;

-- CREATE TABLE api_user ( 
--   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
--   name VARCHAR(20)
-- );

-- CREATE TABLE api_key (
--   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
--   name VARCHAR(20),
--   api_user_id INT, FOREIGN KEY (api_user_id) REFERENCES api_user(id) ON DELETE CASCADE
-- );

INSERT INTO organization
(name, short_name, bag_label_type)
VALUES
("Community Movement Builders", "CMB", "");

INSERT INTO api_key
(name, api_user_id)
VALUES
("bar", 1);

INSERT INTO api_user
(name, organization_id)
VALUES
("foo", 1);
