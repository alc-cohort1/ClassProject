
 const mysql=require('mysql');
const Connection = mysql.createConnection({
	
	host:'localhost',
	user:'root',
	database:'portfoliodb'
})
const baseUrl="http://localhost:3000/"
const form=require("express");
const app=form();
//const parser=require('express')
const parser=require('body-parser')


app.use(form.static('./pages'));


//middleware
app.use(parser.urlencoded({extended:false}))

app.post('/user_create',(req,res)=>{
	console.log("u are posting some data")
	console.log('the name you entered is '+req.body.Name)
	console.log('Email'+req.body.email)
	console.log('Comment '+req.body.comment)


const N_ame=req.body.Name
const E_mail=req.body.email
const comm=req.body.comment

const querystring="INSERT INTO message (`Name`, `email`, `comment`) VALUES(?,?,?)"
Connection.query(querystring,[N_ame,E_mail,comm],(err,result,field)=>{
	if(err){
		console.log('an error occured' +err)
		res.status(500)
		return
	}
	Connection.query(querystring,function(err,result){
		res.redirect(baseUrl);
	})
//res.render('index.pug',{tittle:'Data saved',
//message:'comment saved successfully.'})
//Connection.end();
})

})
//Binding to a port
app.listen(3000, ()=>{
	console.log(' server started at port 3000');
});