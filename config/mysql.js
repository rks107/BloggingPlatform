const mysql = require("mysql");

const env = require("./environment");

var config = {
  host: env.host,
  user: env.user,
  password: env.password,
  database: env.database,
  port: 3306,
};

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
