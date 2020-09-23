const express = require("express");
const env = require("./config/environment");
const logger = require("morgan");
const app = express();
const cookiePrser = require("cookie-parser");
const path = require("path");
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");
const sassMiddleware = require("node-sass-middleware");
const db = require("./config/mysql");

// Used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("./config/passport-local-strategy");
const MySQLStore = require('connect-mysql')(session);
const flash = require("connect-flash");
const customeMware = require("./config/middleware");



app.use(cookiePrser());

if (env.name == "development"){
  // SASS
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: false,
      outputStyle: "expanded",
      prefix: "/css",
    })
  );
}


// middleware
app.use(express.urlencoded({ extended: true }));


app.use(express.static(env.asset_path));

// MORGAN
app.use(logger(env.morgan.mode, env.morgan.options));

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
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MySQLStore(db)
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.checkAuthenticationUser);

// For Flashes
app.use(flash());
app.use(customeMware.setFlash);

// use express router
app.use('/',require('./routers'));



app.listen(port, function (err) {
  if (err) {
    console.log(`Error in runing surver: ${err}`);
    return;
  }

  console.log(`Server is runing on port: ${port}`);
});