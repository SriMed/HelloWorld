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
        res.locals.studentslist = []
        results[0].forEach(function(elem,index) {
            // console.log(elem)
            // console.log(elem["username"])
            res.locals.students.push({"user":elem["username"], "house":elem["house"]})
            res.locals.studentslist.push(elem["username"])
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
                res.locals.houses.push(elem["name"])
            }
        })
        
        console.log(res.locals.houses)
        
        next()
    });
}

function usersByHouse(req,res,next) {
    house_name = req.query.house_name
    res.locals.user_house_name = house_name
    if(house_name === undefined) {
        console.log("no house name given for users by house")
        next()
    }
    else {
        pool.query('CALL selectUsers(?)', [house_name], function(error, results1, fields){
            if (error) throw error;
            
            var results = Array.from(results1);
            
            console.log('USER RESULTS AT LINE 77')
            console.log(results);
            
            res.locals.users_by_h = []
            results[0].forEach(function(elem) {
                // console.log(elem)
                // console.log(elem["username"])
                if('username' in elem) {
                    res.locals.users_by_h.push(elem["username"])
                }
            })
            
            console.log(res.locals.users_by_h)
            
            next()
        });
    }
}

function currentPoints(req,res, next) {
    pool.query('SELECT * FROM points', function(error, results1, fields){
        if (error) throw error;
        
        var results = Array.from(results1);
        
        console.log('POINTS RESULTS AT LINE 102')
        console.log(results)
        
        res.locals.points = []
        results.forEach(function(elem,index) {
            // console.log(elem)
            // console.log(elem["username"])
            res.locals.points.push({"giver_user":elem["giver_user"], "receiver_user":elem["receiver_user"], "points_received": elem["points_received"]})
        })
        
        console.log("points_array")
        console.log(res.locals.points)
        
        next()
    });
}

exports.house_home = [currentUsers, getHouses, usersByHouse, currentPoints, function(req, res) {
    
    var user_by_house_table_need = req.query.user_by_house_table_need;
    console.log("user_by_house_table_need")
    console.log(user_by_house_table_need)
    
    var points_all_need = req.query.points_all_need;
    
    var _logged = false
    
    var message = "" + req.query.message //the default message is how many points added
    
    if('oauth_user' in req.cookies) {               //if logged in
        _logged = true
        
        var oauth_user = req.cookies["oauth_user"]
        
        if(req.query.message === undefined) {
            message = "Have fun being teacher"
            console.log(message)
        }
        
        if(user_by_house_table_need === 'true') {
            message = "View table for results";
            console.log(message)
        }
        else {
            user_by_house_table_need = false
        }
        
        if(points_all_need === 'true') {
            message = "View table for results"
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
            reset_perm: reset_permission,
            students_list: res.locals.studentslist,
            user_by_house_tn: user_by_house_table_need,
            users_by_house: res.locals.users_by_h,
            users_house_name: res.locals.users_house_name,
            points_an: points_all_need,
            points_all: res.locals.points
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

exports.getPointsAllocation = function(req,res){
    var points_all_need = true;
    re_endpoint = 'https://user.tjhsst.edu/2021smedaram/house_home?points_all_need=' + points_all_need;
    res.redirect(re_endpoint)
}

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

function poiByHouse(req,res,next) {
    var house_poi_name = req.query.house_poi
    console.log(house_poi_name)
    pool.query('CALL getPointsByHouse(?)', [house_poi_name], function(error, results, fields){
        if (error) throw error;
    
        console.log('HOUSES RESULTS AT LINE 178');
        console.log(results)
        console.log(results[0])
        
        res.locals.tp = "The " + house_poi_name + " house has " + results[0][0].total_points + " total points"
        console.log(res.locals.tp)
        next()
    });
}

exports.getPointsByHouse = [poiByHouse, function(req,res) {
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


exports.getUsersByHouse = function(req,res) {
    var user_by_house_table_need = true;
    re_endpoint = 'https://user.tjhsst.edu/2021smedaram/house_home?user_by_house_table_need=' + user_by_house_table_need + '&house_name=' + req.query.house_name;
    res.redirect(re_endpoint)
}

function deleteUserHelper(req,res,next) {
    var username = req.query.username;
    console.log("Call to add user")
    pool.query('CALL deleteUser(?)', [username], function(error, results, fields){
        if (error) throw error;
    
        res.locals.deletedUser = "Successfully deleted " + username + " from users list"
        console.log(res.locals.deletedUser)
        next()
    }); 
}

exports.deleteUser = [deleteUserHelper, function(req,res){
    res.send(res.locals.deletedUser)
}]

function resetTables(req,res,next) {
    console.log("Server side: Resetting tables by calling init_prepop again")
    pool.query('CALL reset()', function(error, results, fields){
        if (error) throw error;
    
        res.locals.reset = "Successfully reset all tables. No users or points in database"
        next()
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