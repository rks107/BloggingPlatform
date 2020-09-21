const express = require("express");
const app = express();
const cookiePrser = require("cookie-parser");
const path = require("path");
const port = process.env.PORT ||  100;
const expressLayouts = require("express-ejs-layouts");
const sassMiddleware = require("node-sass-middleware");
const db = require("./config/mysql");
// Used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("./config/passport-local-strategy")

app.use(cookiePrser());

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

app.use(
  session({
    name: "BloggingPlatform",
    secret: "SomethingSecreteKey",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // store: new MongoStore(
    //   {
    //     mongooseConnection: db,
    //     autoRemove: "disabled",
    //   },
    //   function (err) {
    //     console.log(err || "connect-mysql setup ok");
    //   }
    // ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.checkAuthenticationUser);


// use express router
app.use('/',require('./routers'));


app.listen(port, function (err) {
  if (err) {
    console.log(`Error in runing surver: ${err}`);
    return;
  }

  console.log(`Server is runing on port: ${port}`);
});