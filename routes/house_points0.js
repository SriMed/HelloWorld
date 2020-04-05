var mysql = require('mysql');

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

function currentUsers(req,res, next) {
    pool.query('CALL getUsers()', function(error, results1, fields){
        if (error) throw error;
        
        var results = Array.from(results1);
        
        console.log('USERS RESULTS AT LINE 22')
        console.log(results[0])
        
        res.locals.students = []
        results[0].forEach(function(elem,index) {
            // console.log(elem)
            // console.log(elem["username"])
            res.locals.students.push({"user":elem["username"], "house":elem["house"]})
        })
        
        console.log(res.locals.students)
        
        next()
    });
}

function getHouses(req,res, next) {
    pool.query('SELECT * FROM houses', function(error, results1, fields){
        if (error) throw error;
        
        var results = Array.from(results1);
        
        console.log('HOUSES RESULTS AT LINE 44')
        console.log(results);
        
        res.locals.houses = []
        results.forEach(function(elem) {
            // console.log(elem)
            // console.log(elem["username"])
            if('name' in elem) {
                res.locals.houses.push({"v":elem["id"], "opt":elem["name"]})
            }
        })
        
        console.log(res.locals.houses)
        
        next()
    });
}


exports.house_home = [currentUsers, getHouses, function(req, res) {
    
    var _logged = false
    
    var message = "" + req.query.message //the default message is how many points added
    
    if('oauth_user' in req.cookies) {               //if logged in
        _logged = true
        
        var oauth_user = req.cookies["oauth_user"]
        
        if(req.query.message === undefined) {
            message = "Have fun being teacher"
            console.log(message)
        }
        
        console.log(oauth_user)
        
        var reset_permission = false;
        if(oauth_user["name"] == "Srilakshmi" || oauth_user["is_teacher"] === true) { //main permissions 
            reset_permission = true;
        }
        
        render_dict = {
            mssg: message,
            teacher_user_name: oauth_user["name"],
            // c_table: currentTable,
            // c_houses: currentHouses,
            // c_points: currentPoints,
            loggedin: _logged,
            students: res.locals.students,
            houses: res.locals.houses,
            reset_perm: reset_permission
        }
    }
    else {
        
        if(req.query.message === undefined) {
            message = "*necessitates ion account"
        }
        
        render_dict = {
            mssg: message,
            loggedin: _logged
        }
    }
    // console.log(oauth_user)
    
    res.render("house_home", render_dict);
}]

function awardPoints(req,res,next) {
    var oauth_user = req.cookies["oauth_user"]
    var receiver = req.query.receiver
    var points = parseInt(req.query.points)
    
    console.log(receiver)
    console.log(points)
    
    pool.query('CALL addPoints(?,?,?)', [oauth_user["name"], receiver, points], function(error, results, fields){
        if (error) throw error;
        
        res.locals.addedPoints = "Successfully added " + points + " points to " + receiver;
        next()
    });
}

exports.house_awards = [awardPoints, function(req, res) {   //error here
    res.send(res.locals.addedPoints)
}]

function getHouseName(req,res,next) {
    var house_poi = parseInt(req.query.house_poi)
    console.log(house_poi);
    
    pool.query('SELECT name FROM houses WHERE id=?', [house_poi], function(error, results, fields){
        if (error) throw error;
    
        console.log('HOUSES RESULTS AT LINE 164');
        console.log(results)
        console.log(results[0])
        
        res.locals.name = results[0].name
        console.log(res.locals.name)
        next()
    });
}

function poiByHouse(req,res,next) {
    console.log(house_poi_name)
    pool.query('CALL getPointsByHouse(?)', [res.locals.name], function(error, results, fields){
        if (error) throw error;
    
        console.log('HOUSES RESULTS AT LINE 178');
        console.log(results)
        console.log(results[0])
        
        res.locals.tp = "The " + res.locals.name + " house has " + results[0][0].total_points + " total points"
        console.log(res.locals.tp)
        next()
    });
}

exports.getPointsByHouse = [getHouseName, poiByHouse, function(req,res) {
    res.send(res.locals.tp)
}]


function poiByUser(req,res,next) {
   var user = req.query.user_poi
   pool.query('CALL getPointsByUser(?)', [user], function(error, results, fields){
        if (error) throw error;
    
        console.log('USER RESULTS AT LINE 198');
        console.log(results)
        console.log(results[0])
        
        res.locals.tp = user + " has " + results[0][0].total_points + " total points"
        console.log(res.locals.tp)
        next()
    }); 
}

exports.getPointsByUser = [poiByUser, function(req,res){
    res.send(res.locals.tp)
}]

function callAddUser(req,res,next) {
    var user_name = req.query.user_name
    var user_house = req.query.user_house
    console.log("Call to add user")
    pool.query('CALL addUser(?,?)', [user_name, user_house], function(error, results, fields){
        if (error) throw error;
    
        res.locals.addedUser = "Successfully added " + user_name + " to the " + user_house + " house"
        console.log(res.locals.addedUser)
        next()
    });   
}

exports.addUser = [callAddUser, function(req,res) {
    res.send(res.locals.addedUser)
}]

function resetTables(req,res,next) {
    pool.query('SOURCE ./public/tests/init_prepop.sql', function(error, results, fields){
        if (error) throw error;
    
        res.locals.reset = "Successfully reset all tables. No users or points in database"
    });
}

//make this function here that runs init_pop
exports.reset = [resetTables, function(req, res) {
    res.send(res.locals.reset)
}]
// perform a query and get the result in javascript
// var x = 'VA';

// // perform a query and get the result in javascript
// pool.query('CALL get_by_state(?)', [x], poolCallbackFunction);


// /* --------------------------------- */
// /*    HELPER FUNCTION                */

// function poolCallbackFunction (error, results, fields) {
//   if (error) throw error;

//   console.log('The solution is: ', results[0]); 
//   terminatePool();
// }

// function terminatePool() {
//   // THE FOLLOWING IS A TOTAL HACK TO CLOSE THE POOL 
//   pool.end(); //terminate the pool when the first asyncrhonous pool.query finishes
// }