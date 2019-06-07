//requiring packages of express,body-parser,mysql
const express = require("express");
const parser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(express.static("./templates"));

app.use(parser.urlencoded({ extended: false }));

//connecting to the database info
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "info"
});
//sendMe is the action specified in the form in index.html
app.post("/sendMe", (req, res) => {
  console.log("Your name is:" + req.body.name);

  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  const querystring =
    "INSERT INTO Message (`name`, `email`,`subject`, `message`) VALUES (?,?,?,?)";

  connection.query(
    querystring,
    [name, email, subject, message],
    (err, results, field) => {
      if (err) {
        console.log("An error occured" + err);
        res.status(500);
        return;
      }
    }
  );
});

// the port
app.listen(3500, () => {
  console.log("Express server started at port 3500");
});
