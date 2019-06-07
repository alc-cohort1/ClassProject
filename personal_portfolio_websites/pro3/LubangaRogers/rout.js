//declaring required dependencies
const express = require('express')
const parser = require('body-parser')
const mysql = require('mysql')
const app = express()

//using body parser dependency
app.use(parser.urlencoded({extended:false}))
//making a route to the templates folder
app.use(express.static('./templates'))

//the get connection instance
const getConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'potfolio'

})
//using the post method to post data to the database
app.post('/post',(req, res)=>{
    
    console.log('you are posting some formdata')
    const message = req.body.message
   
   //posting form data to the database using mysql //
    const querystring = "INSERT INTO `potfolio`.`messages` (`message`) VALUES (?)"
    getConnection.query(
        querystring, [message], (err,results,field)=>{
        if(err){
            console.log('an error occured' + err)
            
            return
        }

    })
});


app.listen(4000,()=>{
    
    console.log('express server started at port 3000');
});