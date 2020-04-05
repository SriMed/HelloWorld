subscriberCount = 0

exports.cookieContentEndpoint = function (req,res,next) {
    var userd = req.cookies['user']
    
    var user = req.query.user
    var pass = req.query.pass
    res.locals.cookie_worker2check = req.query.login
    console.log('req.query.login ' + req.query.login)
    // console.log(userdict)
    if (userd) {                    //if it already exists, then update it again
        
        res.locals.cookielogin = false
            
        if (userd["loggedin"] === false && user != undefined) { //if user is something and we're currently not logged in 
            userd["username"] = user
            userd["password"] = pass
            userd["loggedin"] = true
        }
        
        res.cookie('user', userd)
        
        console.log("cookie update")
        console.log(userd["views"])
        console.log(userd["loggedin"])
        console.log(userd["username"])
        console.log(userd["password"])
        
        if(userd["views"] >= 5 && userd["loggedin"] === false) {     //if you're not logged in //5 because only updated later
            res.locals.cookielogin = true
        }
        
        if(res.locals.cookielogin == false) {
            var update = userd["views"] + 1
            userd["views"] = update
            
            res.cookie('user', userd)
            console.log("cookie update same")
            console.log(userd["views"])
        }
        
        res.locals.loggedin = userd["loggedin"]
        res.locals.userobj = userd
    }
    else {
        userdict = {
            "views" : 1,
            "username": undefined,
            "password": undefined,
            "loggedin": false
        }
        res.locals.loggedin = userdict["loggedin"]
        res.locals.cookielogin = false
        res.locals.userobj = userdict
        
        res.cookie('user', userdict);     //else set the views to one
        console.log("set cookie first. views = 1")
    }
    next()
}
exports.cookiecontent = function(req, res){
    // setting cookies
    if(res.locals.cookielogin == true) {        //this is the login endpoint
        console.log("got to 5")
        render_dict = {
            message: "Apologies. Only premium users can view content more than 5 times. Please log in to continue",
        }
        res.render('cookielogin', render_dict)
    }
    else {
        render_dict = {
            message: "Guess who's inside the box!",
            submessage: "Please click refresh to guess again",
            img: "pics/box.jpg",
            numviews: res.locals.userobj["views"],
            use: res.locals.userobj["username"]
        }
        console.log('res.locals.loggedin' + res.locals.loggedin)
        if(res.locals.loggedin === false) {
            console.log("displaying cookie content here")
            res.render('cookiecontent', render_dict)
        }
        else  {
            if(res.locals.cookie_worker2check === true) {
                console.log('got to cookie_worker2')
                res.render('cookie_worker2', render_dict)
            }
            else {
                console.log('final cookie content')
                res.render('cookie_worker_final3', render_dict)
            }
        }
    }
}
exports.cookie_logout = function(req, res) {
    
    var userd = req.cookies['user']
    
    userd["loggedin"] = false
    userd["username"] = ""
    userd["password"] = ""
    res.cookie('user', userd)
    
    console.log(userd["username"])
    console.log(userd["password"])
    
    render_dict = {
        message: "Thank you for logging out. You may now choose to log back in if you wish to view premium content",
    }
    
    res.render('cookie_logout', render_dict)
    
}
exports.cookie_worker = function(req, res) {
    
    var guess = req.query.guess
    
    var result = false;
    
    if(guess == "waldo")
    {
        result = true;
    }
    
    render_dict = {
        message: "",
        resu: result
    }
    
    res.render('one', render_dict)
    
}