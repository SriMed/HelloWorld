tally = {
    "hip": 0,
    "zeb": 0,
    "koala": 0,
    "snake": 0,
    "colonial": 0
}

exports.home = function(req, res){
    var img = "pics/animals.gif"
    
    render_dict = {
        message: "Choose the animal you like",
        animals: [{"v": "hip", "opt": "Hippo"}, {"v": "zeb", "opt": "Zebra"}, 
                {"v": "koala", "opt": "Koala"}, {"v": "snake", "opt": "Snake"},
                {"v": "colonial", "opt": "Colonial"}],
        image: img
    }
    
    res.render('voting_form', render_dict)
};

exports.worker =  function(req, res) {
    
    var vote = req.query.animal
    var name = req.query.name
    var email = req.query.email
    
    console.log(email)
    
    tally[vote] = tally[vote] + 1;
    console.log(tally[vote])
    render_dict = {
        message: "Voting results!",
        animals: [{"name": "Hippo", "tally": tally["hip"]}, {"name": "Zebra", "tally": tally["zeb"]},
                {"name": "Koala", "tally": tally["koala"]}, {"name": "Snake", "tally": tally["snake"]},
                {"name": "Colonial", "tally": tally["colonial"]}],
        n: name,
        ema: email
    }
    
    res.render('voting_worker', render_dict)
    
}