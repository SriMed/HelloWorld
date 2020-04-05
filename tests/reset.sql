DROP PROCEDURE IF EXISTS reset;
DELIMITER $$
CREATE PROCEDURE reset()
BEGIN
    DROP TABLE IF EXISTS users;
    CREATE TABLE users(username VARCHAR(100), age INT, house_id int, PRIMARY KEY(username));
    DROP TABLE IF EXISTS houses;
    CREATE TABLE houses(id INT, name VARCHAR(100), PRIMARY KEY(id));
    INSERT INTO houses(id,name) VALUE (0, 'Gryffindor');
    INSERT INTO houses(id,name) VALUE (1, 'Ravenclaw');
    INSERT INTO houses(id,name) VALUE (2, 'Slytherin');
    INSERT INTO houses(id,name) VALUE (3, 'Hufflepuff');
    DROP TABLE IF EXISTS points;
    CREATE TABLE points(giver_user VARCHAR(100), receiver_user VARCHAR(100), points_received INT);
END $$
DELIMITER ; 