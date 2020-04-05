//middleware
var fs = require('fs');
var path = require('path')      

statesObj = {}
exports.readSenators = function (req,res,next) {        //exports makes it public
    var pa = __dirname
    pa = pa.slice(0,pa.lastIndexOf('/'))
    var fname  = path.join(pa, 'resources/txt/statesjson.txt')
    console.log(fname)
    fs.readFile(fname, (err, data) => 
    { 
        res.locals.statesToSenators = {}
        // if (err) throw err;
        console.log("unparsed data:")
        console.log(data.toString())
        dataArr = JSON.parse(data.toString())
        console.log("parsed data")
        console.log(dataArr)
        res.locals.states = []
        var count = 0;
        dataArr = dataArr.forEach(function(elem) {
            // console.log(elem)
            if(elem[1] in res.locals.statesToSenators)
            {
                res.locals.statesToSenators[elem[1]] = [res.locals.statesToSenators[elem[1]], [elem[0], elem[3], elem[2]]]
                console.log("final element per state:")
                console.log(res.locals.statesToSenators[elem[1]])
            }
            else {
                res.locals.statesToSenators[elem[1]] = [elem[0], elem[3], elem[2]]
                var obj = {"v": String(count), "opt": String(elem[2])}
                res.locals.states.push(obj)
                statesObj[String(count)] = String(elem[2])
                count = count + 1
            }
            // console.log(stateToSenators)
        })
        
        next()
    })
}
exports.readFacts = function (req,res,next) {
    var pa = __dirname
    pa = pa.slice(0,pa.lastIndexOf('/'))
    var fname  = path.join(pa, 'resources/txt/facts.txt')
    fs.readFile(fname, (err, data) => 
    { 
        res.locals.facts = []
        // if (err) throw err;
        console.log("unparsed data:")
        console.log(data.toString())
        dataArr = JSON.parse(data.toString())
        console.log("parsed data")
        console.log(dataArr)
        dataArr = dataArr.forEach(function(elem) {
            // console.log(elem)
            res.locals.facts.push(elem)
            // console.log(stateToSenators)
        })
        
        next()
    })
}

//for app.gets
exports.home =  function(req, res) {
    
    render_dict = {
        message: "Here is the maps page. Play the game",
        sToSen: JSON.stringify(res.locals.statesToSenators),
        states: res.locals.states
    }
    
    console.log(render_dict);
    
    res.render('mapHome', render_dict)
    
}

exports.importance = function(req, res) {
    
    render_dict = {
        header: "Senators - So What?",
        message: "Knowing your senators is key to being an informed citizen. Be informed. Be a patriot.",
    }
    
    console.log(render_dict)
    
    res.render('mapTab', render_dict)
    
}

exports.doc = function(req, res) {
    
    render_dict = {
        header: "How to use this infographic:",
        message: "Click on a state. View its senators. Memorize them.",
    }
    
    console.log(render_dict)
    
    res.render('mapTab', render_dict)
    
}

exports.funfact = function(req, res) {
    
    render_dict = {
        header: "Get to know your senators!",
        subheader: "Fun Facts!",
        message: "Fun Fact Here",
        funF: JSON.stringify(res.locals.facts)
    }
    
    console.log(render_dict)
    
    res.render('mapFunFact', render_dict)
    
}

exports.worker = function(req, res) {
    
    var liveState = req.query.liveState
    var name = req.query.name
    var email = req.query.email
    
    subscriberCount = subscriberCount + 1
    
    render_dict = {
        message: "",
        subscriberC: subscriberCount,
        n: name,
        ema: email,
        liState: statesObj[liveState]
    }
    
    res.render('mapWorker', render_dict)
    
}