
 const mysql=require('mysql');
const Connection = mysql.createConnection({
	
	host:'localhost',
	user:'root',
	database:'portfoliodb'
})

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
res.render('index.pug',{tittle:'Data saved',
message:'comment saved successfully.'})
//Connection.end();
})

})
//Binding to a port
app.listen(3000, ()=>{
	console.log(' server started at port 3000');
});