var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// var mysql = require('mysql');

const mariadb = require('mariadb');
// const pool = mariadb.createPool({
//      host: 'localhost', 
//      user:'judith', 
//      password: '',
//     database: 'ALC',
//      connectionLimit: 5
// });
// async function asyncFunction() {
//   let conn;
//   try {
// 	conn = await pool.getConnection();
// 	const rows = await conn.query("SELECT 1 as val");
// 	console.log(rows); //[ {val: 1}, meta: ... ]
// 	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
// 	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//     console.log('Connected!');

//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) return conn.end();
//   }
// }
 
// var Client = require('mariasql');
// var connection = new Client({
//   host: '127.0.0.1',
//   user: 'root',
//   db: 'toyota',
//   port: 3306
// });

// const mysql = require('mysql');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'judith', 
     password: '',
    database: 'ALC',
     connectionLimit: 5
});
async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
  } catch (err) {
	throw err;
  } finally {
	if (conn) {
     console.log('Connected!');
  };
  }
}
 

 
//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration
 
//create app server
var server = app.listen(3000,  "127.0.0.1", function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
});
 
// //rest api to get all results
// app.get('/employees', function (req, res) {
//    connection.query('select * from employee', function (error, results, fields) {
    
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });
 
// //rest api to get a single employee data
// app.get('/employees/:id', function (req, res) {
//    console.log(req);
//    connection.query('select * from employee where id=?', [req.params.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });
 
//rest api to create a new record into mysql database
app.post('/employees', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO employee SET ?', postData, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
 
// //rest api to update record into mysql database
// app.put('/employees', function (req, res) {
//    connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });
 
// //rest api to delete record from mysql database
// app.delete('/employees', function (req, res) {
//    console.log(req.body);
//    connection.query('DELETE FROM `employee` WHERE `id`=?', [req.body.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end('Record has been deleted!');
// 	});
// });
