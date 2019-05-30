
 const mysql=require('mysql');
 const Connection = mysql.createConnection({
     
     host:'localhost',
     user:'root',
     database:'reg'
 })
 const baseUrl="http://localhost:3000/"
 const form=require("express");
 const app=form();
 //const parser=require('express')
 const parser=require('body-parser')
 
 
 app.use(form.static('./templates'));
 
 
 //middleware
 app.use(parser.urlencoded({extended:false}))
 
 app.post('/contact',(req,res)=>{
     console.log("u are posting some data")
     console.log('the name you entered is '+req.body.name)
     console.log('Email is '+req.body.email)
     console.log('Comment '+req.body.message)
 
 
 const name=req.body.name
 const email=req.body.email
 const message=req.body.message
 
 const querystring="INSERT INTO `contact` (`name`, `email`, `message`) VALUES(?,?,?)"
 Connection.query(querystring,[name,email,message],(err,result,field)=>{
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