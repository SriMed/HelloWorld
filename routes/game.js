var fs = require('fs');
var path = require('path')
var mysql = require('mysql');
var child_process = require("child_process");

// create a connection pool
//  - this allows for multiple connections to occur without incurring 'startup costs' 
//    (these costs are time costs for setting up a db connection)
//    it allows a connection to your db to be reused among subsequent users.
var pool  = mysql.createPool({
  connectionLimit : 10,
  user            : 'site_2021smedara',
  password        : '94cP934Urv7jxnxDtKave5BC',
  host            : 'mysql1.csl.tjhsst.edu',
  port            : 3306,
  database        : 'site_2021smedaram'
});

tally = 0; //tally of the number of words the user got correct
letters = "";
words = [];
points = 0;

// function readAllWords(req,res,next) {        //exports makes it public
//     var pa = __dirname
//     pa = pa.slice(0,pa.lastIndexOf('/'))
//     var fname  = path.join(pa, 'resources/txt/words_all.txt')
//     console.log(fname)
    
//     fs.readFile(fname, (err, data) => 
//     {                             
//         if (err) throw err;
//         console.log("RAW DATA AT LINE 27")
//         console.log(data)
//         console.log("UNPARSED DATA AT LINE 29")
//         res.locals.data = data.toString()
//         // console.log(res.locals.data)
//         console.log("read in all words")
//         next()
//     })
// }

// function parseAllWords(req, res, next) {
//     // console.log("PARSED DATA AT LINE 32")
//     dataArr = res.locals.data.split('\n')
//     console.log(dataArr)
//     var count = 0;
//     dataArr = dataArr.forEach(function(elem) {
//         console.log(elem)
//         words.push(elem)
//         count = count + 1
//         console.log(words)
//     })
//     console.log("parsed all words")
//     next()
// }
function genRandomLetters(req,res,next) {
    
    tally = 0; //tally of the number of words the user got correct
    letters = "";
    words = [];
    points = 0;
    
    var pa = __dirname
    pa = pa.slice(0,pa.lastIndexOf('/'))

    var py_script = path.join(pa, 'resources/genRandomLetters.py');
    console.log("python path at line 61")
    console.log(py_script)
    
    var spawn = child_process.spawn;
    
    var process = spawn('python', [py_script]);
    
    var result = "";
    
    process.stdout.on('data', function(data) {
        result = data.toString()
        console.log("LETTERS at line 73")
        console.log(result)
        // res.send(result)
        letters = result;
        res.locals.letters = result;
        next()
    })
}

exports.home = [genRandomLetters, function(req, res) {
    
    var _logged = false
    
    var start = req.query.start;
    
    
    if('oauth_user' in req.cookies) {               //if logged in
        _logged = true
        
        var oauth_user = req.cookies["oauth_user"]
        
        render_dict = {
            logged_in: _logged,
            username: oauth_user["name"],
            message: "Play the game",
            letters: res.locals.letters, //need to find a way to randomize common words //then import dictionary so you can tell if its an actual word
            game_start: start,
            num_tally: tally
        };
    }
    else {
       render_dict = {
            logged_in: _logged,
            game_start: start
        }; 
    }
    res.render("game", render_dict);
}]

exports.instructions = function(req,res) {
    var _logged = false
    
    var start = req.query.start;
    
    
    if('oauth_user' in req.cookies) {               //if logged in
        _logged = true
        
        var oauth_user = req.cookies["oauth_user"]
        
        render_dict = {
            logged_in: _logged,
            username: oauth_user["name"],
        };
        res.render('game_instructions', render_dict)
        
    }
    else {
       render_dict = {
            logged_in: _logged,
            mssg: "You MUST log in to use the game",
            game_start: start
        };
        res.render("game", render_dict);
    }
}

function anagramCheck(req,res,next) {
    var word = req.query.word;
    word = word.toLowerCase();
    res.locals.word = word;
    
    var pa = __dirname
    pa = pa.slice(0,pa.lastIndexOf('/'))
    
    var spawn = child_process.spawn;
    
    var py_script = path.join(pa, 'resources/anagramCheck.py');
    console.log("python path at line 119")
    console.log(py_script)
    
    var process = spawn('python', [py_script, word, letters]);
    
    var result = "";
    
    process.stdout.on('data', function(data) {
        result = data.toString()
        console.log("anagramCheck result at line 130 " + result)
        
        res.locals.ac = result;
        console.log('res.locals arg')
        console.log(res.locals.ac)
        next()
    })
}

function checkWord(req,res, next) {
    var word = res.locals.word;
    
    var pa = __dirname
    pa = pa.slice(0,pa.lastIndexOf('/'))
    
    var fname  = path.join(pa, 'resources/txt/words_all.txt')
    console.log("File name at line 105")
    console.log(fname)

    var py_script = path.join(pa, 'resources/checkWord.py');
    console.log("python path at line 109")
    console.log(py_script)
    
    var spawn = child_process.spawn;
    
    var process = spawn('python', [py_script, fname, word]);
    
    var result = "";
    
    process.stdout.on('data', function(data) {
        result = data.toString()
        console.log("Word test at line 165 " + result);
        
        res.locals.wc = result;
        console.log('res.locals arg')
        console.log(res.locals.wc)
        next()
    })
}

exports.check_word = [anagramCheck, checkWord, function(req, res){
    var word = res.locals.word;
    
    var message = "";
    
    var ac = res.locals.ac
    var wc = res.locals.wc
    
    
    if(ac.localeCompare('True') == 1) {
        if(words.includes(word)) {
            message = "Sorry. '" + word + "' is already on your list of words. You have already tried this combination. Please try again.";
        }
        else if(wc.localeCompare('True') == 1) {
            message = "Good job. '" + word + "' is a valid word";
            words.push(word);
            tally = tally + 1;
            points = points + word.length;
        }
        else {
            message = "Sorry. '" + word + "' is not a valid word";
        }
    }
    else {
        message = "Sorry. This is not an anagram of the letters given. Try again."
    }
    
    render_dict = {
        num_tally: tally,
        num_points: points,
        mssg: message 
    }
    res.render('game_worker', render_dict)
}];

function updateLeaderboard(req,res, next) {
    
    var user_name = req.cookies["oauth_user"]["name"]
    var user_email = req.cookies["oauth_user"]["email"];
    var score = points;
    
    pool.query('CALL updateLeaderboard(?,?,?)', [user_name, user_email, score], function(error, results1, fields){
        if (error) throw error;
        
        console.log("Successfully updated leaderboard at 245")
        
        // var results = Array.from(results1);
        
        // console.log('LEADERBOARD RESULTS AT LINE 247')
        // console.log(results[0])
        
        // res.locals.leaderboard = []         //the sql call only gets the first 10 records, sorted by highest score
        // results[0].forEach(function(elem,index) {
        //     // console.log(elem)
        //     // console.log(elem["username"])
        //     res.locals.students.push({"user":elem["user_name"], "email": elem["user_email"], "score":elem["score"]})
        // })
        
        // console.log(res.locals.leaderboard)
        
        next()
    });
}

// function getUserHS(req,res, next) {
//     var word = req.query.word; //somehow get the word
//     pool.query('CALL getUserHS(?)', [function(error, results1, fields){
//         if (error) throw error;
        
//         var results = Array.from(results1);
        
//         console.log('USERHS RESULTS AT LINE 44')
//         console.log(results);
        
//         res.locals.houses = []
//         results.forEach(function(elem) {
//             // console.log(elem)
//             // console.log(elem["username"])
//             if('name' in elem) {
//                 res.locals.houses.push({"v":elem["id"], "opt":elem["name"]})
//             }
//         })
        
//         console.log(res.locals.houses)
        
//         next()
//     });
// }

exports.results = [updateLeaderboard, function(req,res) {
    //call a bunch of sql procedures
    var _logged = false;
    
    if('oauth_user' in req.cookies) {               //if logged in
        _logged = true;
        
        var oauth_user = req.cookies["oauth_user"]
        
        render_dict = {
            logged: _logged,
            results: true, 
            username: req.cookies.oauth_user["name"], //need to find a way to randomize common words //then import dictionary so you can tell if its an actual word
            words_list: words,
            num_tally: tally,
            num_points: points
        };
        console.log(render_dict)
        res.render('game_results', render_dict)
        
    }
    else {
       render_dict = {
            logged_in: _logged,
            mssg: "You MUST log in to use the game",
            game_start: start
        };
        res.render("game", render_dict);
    }
}]

function getLeaderboard(req,res, next) {
    
    pool.query('CALL getLeaderboard()', function(error, results1, fields){
        if (error) throw error;
        
        var results = Array.from(results1);
        
        console.log('LEADERBOARD RESULTS AT LINE 307')
        console.log(results[0])
        
        res.locals.leaderboard = []         //the sql call only gets the first 10 records, sorted by highest score
        results[0].forEach(function(elem,index) {
            // console.log(elem)
            // console.log(elem["username"])
            res.locals.leaderboard.push({"user":elem["user_name"], "email": elem["user_email"], "score":elem["score"]})
        })
        
        console.log(res.locals.leaderboard)
        
        next()
    });
}

exports.leaderboard = [getLeaderboard, function(req, res) {
    
    var _logged = false;
    
    if('oauth_user' in req.cookies) {               //if logged in
        _logged = true;
        var reset_permissions = false;
        if(req.cookies.oauth_user["is_teacher"] === true || req.cookies.oauth_user["name"] == "Srilakshmi") {
            reset_permissions = true;
        }
        console.log(reset_permissions)
        render_dict = {
            message: "Top ten results showcased here",
            reset_perm: reset_permissions,
            leaderboard: res.locals.leaderboard
        }
        res.render('game_leaderboard', render_dict)
    }
    else {
       render_dict = {
            logged_in: _logged,
            mssg: "You MUST log in to use the game",
        };
        res.render("game", render_dict);
    }
}]

function resetTable(req,res,next) {
    pool.query('CALL reset()', function(error, results, fields){
        if (error) throw error;
    
        res.locals.reset = "Successfully reset all tables. No users or points in database"
    });
}

//make this function here that runs init_pop
exports.reset = [resetTable, function(req, res) {
    
    var reset_permissions = true;
    
    render_dict = {
        message: res.locals.reset,
        reset_perm: reset_permissions
    }
    
    res.render('game_leaderboard', render_dict)
    
}]
