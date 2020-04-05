

var request = require('request');


var simpleoauth2 = require("simple-oauth2");

var ion_client_id = 'P9g0x6INUP77Wh7Zv8pD27DerGoUbiKlZw4UnJn7';
var ion_client_secret =
'3NURvIUvTTosKra8iwVyhYuKQDu1BVVazjKHuLoiG795ZtpYN8o6csMY8xHiDzhO3ez9fbf4XZGgxHORnh7pYVzqC9GgrwoTZ3nFkGl3yNVKeqSVrPFsctW8Hf9tnYXq';
var ion_redirect_uri = 'https://user.tjhsst.edu/2021smedaram/profile_login_worker';

// Here we create an oauth2 variable that we will use to manage out OAUTH operations
// DO NOT MODIFY THIS OBJECT. IT IS CONFIGURED FOR TJ

var home_URL = 'https://user.tjhsst.edu/2021smedaram/profile_home'

var oauth2 = simpleoauth2.create({
    client: {
        id: ion_client_id,
        secret: ion_client_secret,
    },
    auth: {
        tokenHost: 'https://ion.tjhsst.edu/oauth',
        authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
        tokenPath: 'https://ion.tjhsst.edu/oauth/token'
    }
})

var authorizationUri = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri
})

console.log('authorizationUri: ')
console.log(authorizationUri)

// app.get('/', function(req,res) {
//     res.send("Welcome to this trial page")
// })

exports.profile_home = function(req,res) {
    
    console.log("THIS IS ALL THE SIGNED COOKIES IN REQ AT LINE 60")
    console.log(req.signedCookies)
    
    if(!('token' in req.signedCookies)) {
        
        render_dict = {
            message: "Please click on the button to authenticate and log in",
            aURI: authorizationUri,
            loggedin: false
        }
        
        res.render('profile', render_dict);
    }
    else {
        var accessToken = req.signedCookies.token;
        
        console.log("ACCESS TOKEN AT LINE 75")
        console.log(accessToken)
        
        var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+accessToken["access_token"];
        
        request.get( {url: my_ion_request}, function(e,r,body) {
            var res_object = JSON.parse(body);
            console.log("THIS IS THE OBJECT RECEIVED FROM ION AT LINE 83")
            console.log(res_object)
            // from this javascript object, extract the user's name
            user_name = res_object['short_name'];
            
            console.log(res_object)
            
            oauth_user =  {
                name: user_name,
                class_level: res_object["graduation_year"],
                is_teacher: res_object["is_teacher"],
                email: res_object["tj_email"]
            }
            
            console.log("line 77")
            console.log(oauth_user)
            
            res.cookie("oauth_user", oauth_user)
            
            render_dict = {
                userN: user_name,
                user_class: res_object["graduation_year"],
                picture: res_object["picture"],
                absences: res_object["absences"],
                loggedin: true
            }

            // send away the output
            res.render('profile', render_dict);
        });
    }
    
}

async function handleCode(req, res, next) {
    var theCode = req.query.code;
    
    console.log(theCode)
    
    var options = {
        'code': theCode,
        'redirect_uri': ion_redirect_uri,
        'scope': 'read'
     };
    
    // needed to be in try/catch
    try {
        var result = await oauth2.authorizationCode.getToken(options);      // await serializes asyncronous fcn call
        var token = oauth2.accessToken.create(result);
        res.locals.token = token;
        next()
    } 
    catch (error) {
        console.log('Access Token Error', error.message);
         res.send(502); // bad stuff, man
    }
}

exports.profile_login_worker = [handleCode, function(req, res) { 
    console.log(res.locals.token)
    res.cookie('token', res.locals.token.token, {signed:true});
    
    res.redirect(home_URL);
}]

exports.profile_logout = function(req, res) {
    
    res.clearCookie('token')
    res.clearCookie('oauth_user')
    
    res.redirect(home_URL)
    
}