

var home = require('./home');
var weather = require('./weather');
var funform = require('./funform');
var voter = require('./voter');
var map = require('./map');
var cookie = require('./cookie2');
var profile = require('./profile');
var hp = require('./house_points');

var ani_story = require('./ani_story');
var game = require('./game');

exports.doSet = function(app) {
    //-------express 'get' handlers
    app.get('/', home.home);
    
    app.get('/home_worker', home.home_worker);
    
    
    app.get('/weatherform', weather.home);
    
    app.get('/getweather', weather.getWeather);
    
    
    app.get('/funform', funform.home);
    
    app.get('/predictFuture', funform.predictFuture);
    
    
    app.get('/voting_form', voter.home);
    
    app.get('/voting_worker', voter.worker);
    
    
    app.get('/mapHome', map.readSenators, map.home);
    
    app.get('/mapImportance', map.importance);
    
    app.get('/mapDoc', map.doc);
    
    app.get('/mapFunFact', map.readFacts, map.funfact);
    
    app.get('/mapWorker', map.worker);
    
    
    app.get('/cookie_content', cookie.cookie_content);
    
    app.get('/cookie_logout', cookie.cookie_logout);
    
    app.get('/cookie_login', cookie.cookie_login);
    
    app.get('/cookie_guess_box', cookie.cookie_guess_box);
    
    
    app.get('/profile_home', profile.profile_home)
    
    app.get('/profile_login_worker', profile.profile_login_worker)
    
    app.get('/profile_logout', profile.profile_logout)
    
    
    app.get('/house_home', hp.house_home)
    
    app.get('/house_awards', hp.house_awards)
    
    app.get('/house_getPointsByHouse', hp.getPointsByHouse)
    
    app.get('/house_getPointsByUser', hp.getPointsByUser)
    
    app.get('/house_addUser', hp.addUser)
    
    app.get('/house_getUsersByHouse', hp.getUsersByHouse)
    
    app.get('/house_getPointsAllocation', hp.getPointsAllocation)
    
    app.get('/house_deleteUser', hp.deleteUser)
    
    app.get('/house_reset', hp.reset)
    
    
    app.get('/animated_story', ani_story.home)
    
    
    
    app.get('/game', game.home)
    
    app.get('/game_check_word', game.check_word)
    
    app.get('/game_instructions', game.instructions)
    
    app.get('/game_results', game.results)
    
    app.get('/game_leaderboard', game.leaderboard)
    
    app.get('/game_reset', game.reset)
}