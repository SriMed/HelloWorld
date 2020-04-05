exports.home = function(req, res) {
    
    render_dict = {
        message: "Use the navigation bar to view different sites" 
    }
    
    res.render('home', render_dict)
    
}

exports.home_worker =  function(req, res) {
    
    var guess = req.query.guess
    
    var result = false;
    
    if(guess == "An elephant with 3 legs")
    {
        result = true;
    }
    
    render_dict = {
        message: "",
        resu: result
    }
    
    res.render('one', render_dict)
    
}