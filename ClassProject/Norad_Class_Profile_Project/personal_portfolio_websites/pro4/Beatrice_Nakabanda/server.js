//server.js
const express = require('express');
const parser = require('body-parser');
const mysql = require('mysql');
const app = express();

//Basic route
app.use(express.static('./templates')) 

//middleware
app.use(parser.urlencoded({extended: false}))

//connecting to the database
const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'contact',
        password: '123@#Beat'

})

app.post('/contact_me', (req, res)=>{
    //console.log("You are posting some data")
    console.log('Your name is:' + req.body.name)

    const name = req.body.name
    const email = req.body.email
    const comment = req.body.comments

    const querystring = "INSERT INTO contact_details (name, email, comment) VALUES (?,?,?)";

    connection.query(
        querystring, [name, email, comment], (err, results, field)=>{
            if (err) {
                console.log('An error occured' + err)
                res.status(500)
                return
            }
        
    })
})

//Binding to a port
app.listen(5000, ()=>{
    console.log('Express server started at port 5000');
});
