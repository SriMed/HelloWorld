#!/usr/bin/nodejs


// -------------- load packages -------------- //
var express = require('express')
var app = express();

var hbs = require('hbs');


// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 8080 );

// tell express that the view engine is hbs
app.set('view engine', 'hbs');


// -------------- express endpoint definition -------------- //

app.get('/', function(req, res){

    // var user = req.query.user;

    // var foods = [
    //     'tacos',
    //     'spaghetti',
    //     'pizza',
    //     'kutfa'
    // ]
    
    // var feed_dict = {
    //     user : user,
    //     food_list : foods
    // }
    
    // //  iterate over each element in a list => https://handlebarsjs.com/builtin_helpers.html
    // res.render('index', feed_dict);
    res.send("Number Facts!")

});

function filterbynumfacts(elem, curr, arr){
    numposs = this + 10
    if(curr < numposs)
    {
        return true
    }
}

// WILDCARD HANDLERS MUST COME AFTER ALL OTHER EXPLICIT ENDPOINTS 
app.get('/:page', function(req, res){
        
    var page = req.params.page
    var numfacts = req.query.numfacts
    var format = req.query.format
    
    var numfa = 1

    console.log(numfacts)
    if(numfacts > 0)
    {
        numfa = numfacts;
    }
    console.log(numfa)
    
    var num = parseInt(page);
    var fact = [
        "Zero doesn't have a fact because zero",
        "One is the only number that is neither prime nor composite",
        "Two is the number of shoes you wear. Unless you have only foot",
        "Take any number and multiply it by 3. \n Now add up the digits of the new number. \n Whatever number you begin with, the result will always be divisible by 3. \n For example, take the number 1587:",
        "Four is the first number divisible by 2",
        "In a clock, each of the 60 minutes are divided into groups of 5",
        "2 * 3 = 6",
        "7 is considered a ghost number in Chinese superstition",
        "8 is known as ocho in Spanish",
        "9 is the square of 3",
        "10 is the base of our number system",
        "One is a lonely number",
        "Two is the number of lines in a couplet",
        "Three is the perfect number of people on a quest",
        "Four is the number of limbs we have",
        "Five is the number of questions on a homework quiz",
        "Six is the number of formal shirts I own",
        "Seven is the number of days in a week",
        "Eight is known as enemidhi in Telugu",
        "9 * 9 = 81 = 3 * 3 * 3 * 3",
        "Ten is the number of milimeters in a centimeter"
    ]
    //console.log(info["page"])
    
    nfacts = fact.filter(filterbynumfacts, numfa)
    
    var render_dict = {
        "num": num,
        "Fact1": nfacts[num],
        "Fact2" : nfacts[num+10]
    }
    
    res.render('index', render_dict)
    
    if(typeof(format) == "undefined" || format == "normal")
    {
    res.render('index', render_dict)
    }
    else if(format == "json")
    {
    res.json(render_dict)
    }
});

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});
