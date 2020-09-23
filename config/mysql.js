const mysql = require("mysql");


var config = {
  host: "database-1.cltwvfstzb7n.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "rohitkumar",
  database: "bloggingplatform",
  port: 3306,
};
// var config = {
//   host: "127.0.0.1",
//   user: "root",
//   password: "Rohit@107",
//   database: "bloggingplatform",
//   port: 3306,
// };

const conn = new mysql.createConnection(config);

conn.connect(function (err) {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
  }
});

module.exports = conn;
