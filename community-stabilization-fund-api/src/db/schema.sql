-- Uncomment when creating your own database:

DROP DATABASE IF EXISTS csf_db;

CREATE DATABASE csf_db;
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

-- INSERT INTO api_user
-- (name)
-- VALUES
-- ("foo");

-- INSERT INTO api_key
-- (name, api_user_id)
-- VALUES
-- ("bar", 1);

-- SELECT * FROM api_user;
-- SELECT * FROM api_key;
