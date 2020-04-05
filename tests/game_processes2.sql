DROP PROCEDURE IF EXISTS updateLeaderboard;
DELIMITER $$
CREATE PROCEDURE updateLeaderboard(IN var_username CHAR(100), IN var_email CHAR(100), IN var_score INT)
BEGIN
    INSERT INTO anagrams_scores
        (user_name, user_email, score)
    VALUES
        (var_username, var_email, var_score);
END $$
DELIMITER ;
DROP PROCEDURE IF EXISTS getLeaderboard;
DELIMITER $$
CREATE PROCEDURE getLeaderboard()
BEGIN
    SELECT * FROM anagrams_scores 
    ORDER BY score DESC
    LIMIT 10;
END $$
DELIMITER ;
DROP PROCEDURE IF EXISTS getUserHS;
DELIMITER $$
CREATE PROCEDURE getUserHS(IN var_username CHAR(100))
BEGIN
    SELECT MAX(high_score) FROM anagrams_scores
    WHERE user_name=var_username;
END $$
DELIMITER ;
DROP PROCEDURE IF EXISTS reset;
DELIMITER $$
CREATE PROCEDURE reset()
BEGIN
    DROP TABLE IF EXISTS anagrams_scores;
    CREATE TABLE anagrams_scores(user_name VARCHAR(100), user_email VARCHAR(100), score int);
END $$
DELIMITER ;
