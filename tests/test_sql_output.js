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

pool.query('CALL selectUsers(?)', ["Gryffindor"], function(error, results, fields){
    if (error) throw error;
    
    console.log('RESULTS AT LINE 20')
    console.log(results[0]);
    
    var results = Array.from(results);

    var students = []
    results[0].forEach(function(elem,index) {
        // console.log(elem)
        // console.log(elem["username"])
        students.push({"v":index, "opt":elem["username"]})
    })
    
    console.log(students)
    
    pool.end();
});