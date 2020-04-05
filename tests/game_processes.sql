DROP PROCEDURE IF EXISTS addAnagramUser;
DELIMITER $$
CREATE PROCEDURE addAnagramUser(IN var_username CHAR(100), IN var_email CHAR(100), IN var_score INT)
BEGIN
    INSERT INTO anagrams_users(user_name,user_email,high_score) VALUES(var_username, var_email, var_score) ON DUPLICATE KEY UPDATE user_name = VALUES(user_name), user_email = VALUES(user_email), high_score = VALUES(high_score);
END $$
DELIMITER ;
DROP PROCEDURE IF EXISTS updateLeaderboard;
DELIMITER $$
CREATE PROCEDURE updateLeaderboard(IN var_username CHAR(100), IN var_email CHAR(100), IN var_score INT)
BEGIN
    INSERT INTO anagrams_scores
        (user_name, user_email, score)
    VALUES
        (var_username, var_email, var_score);
    INSERT IGNORE INTO anagrams_users
        (user_name,user_email,high_score)
    VALUES
        (var_username, var_email, var_score)
    ON DUPLICATE KEY UPDATE user_name = VALUES(user_name), user_email = VALUES(user_email), high_score = VALUES(high_score);
    UPDATE anagrams_users
    SET high_score=var_score
    WHERE user_name=var_username AND var_score>high_score;
END $$
DELIMITER ;