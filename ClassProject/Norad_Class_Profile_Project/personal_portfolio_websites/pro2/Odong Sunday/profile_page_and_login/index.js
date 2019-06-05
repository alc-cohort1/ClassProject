const express = require('express');
const mysql = require('mysql');
const parser = require('body-parser');
const crypto = require('crypto');
const session = require('express-session')

const app = express();

const connection = mysql.createConnection({
	host:'localhost',
	user:'alican',
	password:'123',
	database:'alican1'
})

app.use(session({
	secret:'secret',
	resave:true,
	saveUninitialized: true
}))


app.use(parser.urlencoded({extended : true}));
app.use(parser.json());


app.get('/', (req,res)=>{
	res.sendFile(require('path').join(__dirname , './login.html'))
})

app.get('/register', (req,res)=>{
	res.sendFile(require('path').join(__dirname , './register.html'))
})

app.use(express.static(require('path').join(__dirname , '/public')));


app.get('/home', function(request, response) {
	response.sendFile(require('path').join(__dirname + '/index.html'));
});


connection.connect(err=>{
	if(err){
		throw err
	}
	console.log('connected to database')
})

app.post('/userProfile',(req,res)=>{
	const name = req.body.name;
	const company = req.body.company;
	const email = req.body.email;
	const phone = req.body.phone;
	const massage = req.body.massage;

	const queryString = "INSERT INTO `profile`(`name`, `company`, `email`, `phone`,`massage`) VALUES(?, ?, ?, ?, ?)";

	connection.query(queryString, [name, company, email, phone, massage], (err,results,fields)=>{
		if(err){
			console.log(`the error is ${err}`);
			res.status(500);
			return;
		}
	})
})

app.post('/login', (req,res)=>{
	const username = req.body.username;
	const unencrypted = req.body.password;
	const password = crypto.createHash('md5').update(unencrypted).digest('hex');
	if(username && password){
		connection.query(
			'SELECT * FROM `accounts` WHERE `username` = ? AND `password` =?',[username,password],
			(err,results,fields)=>{
				if(results.length > 0){
					req.session.loggedIn = true;
					req.session.username = username;
					res.redirect('/home')
				}
				else{
					res.send('Incorrect username or/and password')
				}
				res.end();
			}
		)}

	else{
		res.send('please enter username and password')
		res.end();
	}
});



app.post('/register', (req,res)=>{
	const username = req.body.username;
	const unencrypted = req.body.password
	const password = crypto.createHash('md5').update(unencrypted).digest('hex');
	const email = req.body.email;

	const queryString = "INSERT INTO `accounts` (`username`, `password`, `email`) VALUES (?, ?, ?)";

	connection.query(queryString, [username,password,email], (err,results,fields)=>{
		if(err){
			console.log(`an error occured ${err}`)
			results.status(500);
			return;
		}else{
			res.redirect('/home')
		}
		res.end();
	})
})

app.get('/home', (req,res)=>{
	if(req.session.loggedIn){
		res.sendFile(require('path').join(__dirname, '/index.html'))
	}else{
		res.send('please login to view this page')
	}
	res.end();
})

app.listen(3000, ()=>{
	console.log('connection established on port 3000')
});