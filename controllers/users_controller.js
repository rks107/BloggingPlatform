const conn = require("../config/mysql");

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
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?);",
      [req.body.name, req.body.email, req.body.password],
      function (err, results, fields) {
        if (err) throw err;
        else console.log("Inserted " + results.affectedRows + " row(s).");
      }
    );
    return res.redirect("/");
  } else {
    return res.redirect("back");
  }
};

module.exports.createSession = function (req, res) {
  return res.redirect("/users/profile");
};

module.exports.profile = function (req, res) {
  conn.query(
    `SELECT * FROM blog where user_id = (?)`,
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
  req.logout();
  return res.redirect("/");
};



// USER DELETE
module.exports.delete = function (req, res) {

  conn.query("DELETE FROM blog WHERE user_id = (?);", [req.user.id], function (
    err,
    results,
    fields
  ) {
    if (err) throw err;
    else console.log("Inserted " + results.affectedRows + " row(s).");
  });

  conn.query("DELETE FROM user WHERE id = (?);", [req.user.id], function (
    err,
    results,
    fields
  ) {
    if (err) throw err;
    else console.log("Inserted " + results.affectedRows + " row(s).");
  });

  req.logout();
  return res.redirect("/");
};