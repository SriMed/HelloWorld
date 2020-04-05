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

exports.home = function(req, res) {
    
    render_dict = {
        message: "View your first story"
    };
    
    res.render("ani_story", render_dict);
}