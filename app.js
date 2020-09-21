const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const expressLayouts = require("express-ejs-layouts");
const sassMiddleware = require("node-sass-middleware");
const db = require("./config/mysql");



// SASS
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: false,
    outputStyle: "expanded",
    prefix: "/css",
  })
);

// middleware
app.use(express.urlencoded({ extended: true }));


app.use(express.static('./assets'));

// Express Layouts
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//EJS View Engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// use express router
app.use('/',require('./routers'));


app.listen(port, function (err) {
  if (err) {
    console.log(`Error in runing surver: ${err}`);
    return;
  }

  console.log(`Server is runing on port: ${port}`);
});