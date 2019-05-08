const express = require("express");
const parser = require("body-parser");
const mysql = require("mysql");

const app = express();

// Allows the static folder to be used
app.use(express.static("./static/"));

// declare a connection variable
const getConnection = mysql.createConnection({
  host: "localhost",
  user: "julius",
  database: "julius3",
  password: "123456"
});

//   Create a connection
getConnection.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to the database");
});

// This routes post comments to the database
app.post("/comments", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const comments = req.body.comments;
  const queryString =
    "INSERT INTO `comments` (`name`, `email`, `comments`) VALUES (?, ?, ?)";
  getConnection.query(queryString, [name, email, comments], err => {
    if (err) {
      console.log("an error has occured " + err);
      res.status(500);
    }
  });
  res.send("ok");
});

// Binding to a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express server started at port ${PORT}`);
});
