var express = require('express')
var app = express()

app.get('/test-sync', function (req, res) {
//  console.log('1. Received Get')
  res.send('Hello World!')

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});
connection.connect(function(err){
if(!err) {
//    console.log("2. Database Connected");    
} else {
    console.log("Error connecting database ... nn");    
}
});

  sql="SELECT * FROM `test-mysql-Customers` LIMIT 2"
connection.query(sql, function(err, rows, fields) {
connection.end();
  if (!err) {
//    console.log("3. SQL Completed");
}  else
    console.log('Error while performing Query.');
  });
});

app.listen(4200, function () {
  console.log('Example app listening on port 4200!')
})
