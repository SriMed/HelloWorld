DROP PROCEDURE IF EXISTS addUser;
DELIMITER $$
CREATE PROCEDURE addUser(IN var_username CHAR(100), IN var_house_name CHAR(100))
BEGIN
    DECLARE var_house_id INT DEFAULT 0;
    SELECT id
    INTO var_house_id
    FROM houses
    WHERE name=var_house_name;
    INSERT INTO users(username,house_id) VALUES(var_username, var_house_id) ON DUPLICATE KEY UPDATE username = VALUES(username), house_id = VALUES(house_id);
END $$
DELIMITER ;
DROP PROCEDURE IF EXISTS selectUsers; 
DELIMITER $$
CREATE PROCEDURE selectUsers(IN var_house_name CHAR(100)) 
BEGIN
    SELECT username
    FROM houses
    JOIN users
        ON houses.id = users.house_id
    WHERE name=var_house_name;
END$$
DELIMITER ;
DROP PROCEDURE IF EXISTS getUsers;
DELIMITER $$
CREATE PROCEDURE getUsers() 
BEGIN
    SELECT username, houses.name AS house
    FROM houses
    JOIN users
        ON houses.id = users.house_id;
END$$
DELIMITER ;
DROP PROCEDURE IF EXISTS deleteUser;
DELIMITER $$
CREATE PROCEDURE deleteUser(IN var_username CHAR(100)) 
BEGIN
    DELETE FROM users WHERE username=var_username;
END$$
DELIMITER ; 