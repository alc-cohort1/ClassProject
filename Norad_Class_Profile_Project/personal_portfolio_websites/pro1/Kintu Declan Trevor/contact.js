//calling the package/module express
const express = require('express')
//assigning variable app to express 
const app= express()
//calling the body-parse module/packages
const parser = require('body-parser')
const mysql = require('mysql')


app.use(express.static('./Templates'))
//Middleware which select HTML elements, encode it to JS before submitting to the DB
app.use(parser.urlencoded({extended: false}))


const getConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'sample_db',

}) 
//handling the post request from the HTML form
app.post('/Contact', (req,res)=>{

console.log("The name entered is: "+ req.body.name)

const name = req.body.name
const email = req.body.email
const message = req.body.message

const querystring = "INSERT INTO profile (`name`, `email`, `message`) VALUES(?,?,?)";

getConnection.query(querystring, [name, email, message], (err, results, feild) => {
	if(err){
		console.log('An error has occured ' +err);
		res.status(500);
		return;
	}
})
});

// //getting the data from the form
// console.log()

//Binding to a port
app.listen(5500,()=>{
console.log('Express server started at port 5500');
});