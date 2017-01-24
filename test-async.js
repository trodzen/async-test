var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : '',
    user     : '',
    password : '',
    database : '',
    debug    :  false
});

function handle_database(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          var tlog = json({"code" : 100, "status" : "Error in connection database"});
          console.log(tlog);
          return;
        }   

        connection.setMaxListeners(0)

     //   console.log('connected as id ' + connection.threadId + ' connection.getMaxListeners()' + connection.getMaxListeners());
        
          sql="SELECT * FROM `test-mysql-Customers` LIMIT 2"

        connection.query(sql,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
          var tlog = json({"code" : 100, "status" : "Error in connection database"});
          console.log(tlog);
              res.json({"code" : 200, "status" : "Error in connection database"});
              return;     
        });
  });
}

app.get("/test-async",function(req,res){-
        handle_database(req,res);
});

app.listen(4200);
