const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const conn = require("./mysql");

const Cryptr = require("cryptr");
cryptr = new Cryptr("bloggingPlatform");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      // find a user and establish the identity
      conn.query(`SELECT * FROM user where email = (?)`, [email], function (
        err,
        user
      ) {
        if (err) {
            req.flash("error", err);
          return done(err);
        }

        const DecryptedPassword = cryptr.decrypt(user[0].password);

        if (user.length == 0 || DecryptedPassword != password) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user[0]);
      });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  conn.query(`SELECT * FROM user where id = (?)`, [id], function (err, user) {
    if (err) {
      console.log("Error in finding user --> Passport_2");
      return done(err);
    }

    return done(null, user[0]);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if user is sign In, then pass the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed In
  return res.redirect("/users/sign-in");
};

passport.checkAuthenticationUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current Signed In user from the session cookies and we are just sending it to the locals for the views
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
