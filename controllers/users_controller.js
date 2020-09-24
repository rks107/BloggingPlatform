const conn = require("../config/mysql");
const Cryptr = require('cryptr');
cryptr = new Cryptr('bloggingPlatform');


// render Sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

// render Sign in page
module.exports.signIn = function(req, res) {

    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title : "Sign In"
    })
}

module.exports.create = function (req, res) {

  if (req.body.password == req.body.confirm_password) {

    conn.query(
      `SELECT * FROM user where email = (?)`,
      [req.body.email],
      function (err, user) {
        if (user[0] && user[0].email == req.body.email) {

          req.flash("error", "Email is already registered");
          return res.redirect("back");

        } else {

          const EncryptedPassword = cryptr.encrypt(req.body.password);
          conn.query(
            `INSERT INTO user (name, email, pass) VALUES (?, ?, ?);`,
            [req.body.name, req.body.email, req.body.password],
            function (err, results, fields) {
              if (err) throw err;
              else {
                req.flash("success", "Signed Up Succesfully !!");
                return res.redirect("/");
              };
            }
          );
          
        }
      }
    );
    

  } else {
    req.flash("error", "Confirm Password not match");
    return res.redirect("back");
  };
};

module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Succesfully");
  return res.redirect("/users/profile");
};

module.exports.profile = function (req, res) {
  conn.query(
    `SELECT * FROM blog where user_id = (?) ORDER BY time_posted DESC`,
    [req.user.id],
    function (err, results, fields) {
      return res.render("user_profile", {
        title: "User Profile",
        blogs: results,
      });
    }
  );
};

module.exports.destroySession = function (req, res) {
  
  req.flash("success", "You have logged out");
  req.logout();
  return res.redirect("/");
};



// USER DELETE
module.exports.delete = function (req, res) {

  const userId = req.user.id;
  req.logout();
  
  conn.query("DELETE FROM blog WHERE user_id = (?);", [userId], function (
    err,
    results,
    fields
  ) {
    if (err) throw err;
    else console.log("Inserted " + results.affectedRows + " row(s).");
  });

  conn.query("DELETE FROM user WHERE id = (?);", [userId], function (
    err,
    results,
    fields
  ) {
    if (err) throw err;
    else console.log("Inserted " + results.affectedRows + " row(s).");
  });

  
  return res.redirect("/");
};