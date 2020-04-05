
loginendpoint = "https://user.tjhsst.edu/2021smedaram/cookie_login"
maxViews = 5
subscriberCount = 0

function checkStatus (req,res,next) {
    var userd = req.cookies['user']
    
    var user = req.query.user
    var pass = req.query.pass
    
    console.log("PARAMETERS PASSED AT LINE 12")
    console.log(user)
    console.log(pass)
    
    if (userd) {                    //if it already exists, then update it again
        
        userd["views"] = userd["views"] + 1
        userd["username"] = user;
        userd["password"] = pass;
        if(userd["username"]) {
            userd["loggedin"] = true;   
        }
        
        res.cookie('user', userd)
        res.locals.userd = userd;
        
        if(userd["views"] > maxViews && userd["loggedin"] === false)
        {
            res.locals.lessthan6 = false;
        }
        else {
            res.locals.lessthan6 = true;
        }
        console.log("UPDATED VIEWS AT LINE 17; CHECKED IF VIEWS GREATER THAN MAX")
        console.log(userd["views"])
        console.log(userd["loggedin"])
        console.log(userd["username"])
        console.log(userd["password"])
    }
    else {
        userdict = {
            "views" : 1,
            "username": undefined,
            "password": undefined,
            "loggedin": false
        }
        res.cookie('user', userdict);     //else set the views to one
        res.locals.userd = userdict
        console.log("SET COOKIE; VIEWS = 1 AT LINE 39")
    }
    next()
}
exports.cookie_login = function(req, res) {     //this is the login endpoint
    console.log("MAX VIEWS EXCEEDED. LOGIN NECESSARY AT LINE 43")
    
    render_dict = {
        message: "Apologies. Only premium users can view content more than 5 times. Please log in to continue",
        lessthan6: false,
        loggedin: false,
        guess: false
    }
    
    res.render('cookie2', render_dict)
}
exports.cookie_content = [checkStatus, function(req, res){
        
    var userd = res.locals.userd;
    
    console.log(userd)
    
    if(res.locals.lessthan6 === false) {
        res.redirect(loginendpoint)
    }
    
    render_dict = {
        message: "Guess who's inside the box!",
        img: "pics/box.jpg",
        numviews: userd["views"],
        use: userd["username"],
        loggedin: userd["loggedin"],
        lessthan6: true,
        guess: false,
    }
    
    res.render('cookie2', render_dict)
}]
exports.cookie_logout = function(req, res) {
    
    var userd = req.cookies['user']
    
    userd["username"] = undefined
    userd["password"] = undefined
    userd["loggedin"] = false
    
    res.cookie('user', userd)
    
    console.log("CLEARED COOKIE ATL LINE 104")
    console.log(userd["username"])
    console.log(userd["password"])
    
    render_dict = {
        message: "Thank you for logging out. You may now choose to log back in if you wish to view premium content",
        loggedin: false,
        lessthan6: false,
        guess: false
    }
    
    res.render('cookie2', render_dict)
    
}
exports.cookie_guess_box = function(req, res) {
    
    var g = req.query.guess
    
    var result = false;
    
    if(g.toUpperCase() == "WALDO")
    {
        result = true;
    }
    
    render_dict = {
        resu: result
    }
    
    res.render('one', render_dict)
    
}