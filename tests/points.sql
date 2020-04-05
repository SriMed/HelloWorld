-- remove space when run again
-- procedures include:
-- addPoints(giver, receiver, points)
-- getPointsByUser(user)
-- getPointsByHouse(house)
-- getPointsByHouseID(house_id)

DROP PROCEDURE IF EXISTS addPoints;
DELIMITER $$
CREATE PROCEDURE addPoints(IN _giver CHAR(100), IN _receiver CHAR(100), IN _points INT) 
BEGIN
    INSERT INTO points(giver_user, receiver_user, points_received) VALUE (_giver, _receiver, _points);
END$$
DELIMITER ; 
DROP PROCEDURE IF EXISTS getPointsByUser;
DELIMITER $$
CREATE PROCEDURE getPointsByUser(IN var_user CHAR(100)) 
BEGIN
    SELECT SUM(points_received) AS total_points
    FROM points
    WHERE receiver_user=var_user;
END$$
DELIMITER ; 
DROP PROCEDURE IF EXISTS getPointsByHouse; 
DELIMITER $$
CREATE PROCEDURE getPointsByHouse(IN var_house_name CHAR(100)) 
BEGIN
    DECLARE var_house_id INT DEFAULT 0;
    SELECT id
    INTO var_house_id
    FROM houses
    WHERE name=var_house_name;

    SELECT SUM(points_received) AS total_points
    FROM users
    JOIN points
        ON points.receiver_user=users.username
    WHERE users.house_id = var_house_id;
END$$
DELIMITER ; 
DROP PROCEDURE IF EXISTS getPointsByHouseID; 
DELIMITER $$
CREATE PROCEDURE getPointsByHouseID(IN var_house_id INT) 
BEGIN

    SELECT SUM(points_received) AS total_points
    FROM users
    JOIN points
        ON points.receiver_user=users.username
    WHERE users.house_id = var_house_id;
END$$
DELIMITER ;