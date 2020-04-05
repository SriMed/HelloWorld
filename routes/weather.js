var request = require('request');

function getLocation (req, res, next) {
    
    res.locals.lat = req.query.lat
    res.locals.long = req.query.long

    var params = {
    url : 'https://api.weather.gov/points/' + res.locals.lat + "," + res.locals.long,
    headers : {
        'User-Agent': 'request' //for weather.gov's API authentication
        }
    }
    try
    {
        request.get( params, function (e, r, body) { //e = error, r = response code (ex. 500), body = big string downloaded
            
            res.locals.obj = JSON.parse(body);
            console.log("Weather Object @ Line 17")
            console.log(res.locals.obj );
            
            if("status" in res.locals.obj) //as in 404 error
            {
                console.log("invalid weather coordinates")
                var render_dict = {
                    message: "Don't put in coordinates not in the US, not numeric, missing keys (i.e. long but not lat), or empty coordinates. Try again."
                    
                }
                res.render('weather', render_dict)  
            }
            else
            {
                res.locals.citystate = {
                    'city': res.locals.obj["properties"]["relativeLocation"]["properties"]["city"], 
                    'state': res.locals.obj["properties"]["relativeLocation"]["properties"]["state"]
                }
                next()
            }
        })
    }
    catch(e)
    {
        console.log("Error in weather input")
        console.log(e)
        var render_dict = {
            message: "Don't put in coordinates not in the US, not numeric, missing keys (i.e. long but not lat), or empty coordinates. Try again."
        }
        res.render('weather', render_dict)
    }
}
function getForecast(req, res, next) {
    
    if (res.locals.obj["properties"]["forecast"] === null)
    {
        var render_dict = {
        message: "Don't put in coordinates not in the US, not numeric, missing keys (i.e. long but not lat), or empty coordinates. Try again."
        }
        res.render('weather', render_dict)
    }
    else
    {
        var params = {
        'url' : res.locals.obj["properties"]["forecast"],
        headers : {
         'User-Agent': 'request'
            }
        }
        
        request.get( params, function(e,r,body){
            
            res.locals.weather = JSON.parse(body)
            // console.log("Weather\n")
            // console.log(res.locals.weather)
            next()
        });
    }
}

function getFinal(req, res, next) {
    
    res.locals.periods = res.locals.weather["properties"]["periods"]
    
    res.locals.tempfacts = {
        temp: res.locals.weather["properties"]["periods"][1]["temperature"],
        unit: res.locals.weather["properties"]["periods"][1]["temperatureUnit"],
        when: res.locals.weather["properties"]["periods"][1]["name"]
    }
    // console.log(res.locals.weather["properties"]["periods"][1])
    // console.log("FinalTemp\n")
    // console.log(res.locals.final)
    next()
}
exports.home = function(req, res) {
    
    res.render('weatherform');
    
}
exports.getWeather = [getLocation, getForecast, getFinal, function(req, res) {
    
    console.log(res.locals.periods)
    
    var render_dict = {
        message: "Here is your weather",
        periods: res.locals.periods,
        where: res.locals.citystate['city'] + ", " + res.locals.citystate['state'],
        //weather: res.locals.tempfacts[when] + "the temperature is" + res.locals.tempfacts[temp] + "degrees " + res.locals.tempfacts[unit],
    }
    
    res.render('weather', render_dict)
    
    if(req.query.json == "yes")
    {
    res.json(render_dict)
    }
    
}]
