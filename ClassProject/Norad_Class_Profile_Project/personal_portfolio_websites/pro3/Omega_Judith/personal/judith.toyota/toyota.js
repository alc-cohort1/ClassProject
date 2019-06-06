var expre = require('express');
// var mySql = require = ('mysql');
// var bodyPaser = ('body-parser');
var toyota = express();




app.get('/',function(req,res){
    res.send('homepage');
});
app.get('/toyota',function(req,res){
    res.send('homepage');
});



app.listen(3000);