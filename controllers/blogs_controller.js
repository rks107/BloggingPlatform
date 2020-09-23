const conn = require("../config/mysql");

module.exports.create = function (req, res) {
   
  conn.query(
    "INSERT INTO blog (user_id, title, text) VALUES (?, ?, ?);",
    [req.user.id, req.body.title, req.body.text],
    function (err, results, fields) {
      if (err) {
        req.flash('error', err);
      } else {
        // req.flash("success", "Blog Published!");
      }
    }
  );
  req.flash("success", "Blog Published!");
  return res.redirect("/users/profile");
};

// BLOG DELETE
module.exports.delete = function (req, res) {

  conn.query("DELETE FROM blog WHERE id = (?);", [req.params.id], function (
    err,
    results,
    fields
  ) {
    if (err) {
        req.flash('error', err);
      } else {
        // req.flash("success", "Blog Deleted!");
      }
  });
  req.flash("success", "Blog Deleted!");
  return res.redirect("back");
};

// Refer to form for updating blog
module.exports.refToUpdateBlog = function (req, res) {

  conn.query(
    "select * from blog WHERE id = (?);",
    [req.params.id],
    function (err, results, fields) {
      if (err) {
        return res.redirect("back");
        
      } else {
          // console.log(results[0]);
        return res.render('update_blog',{
            title: 'Update Blog',
            blog: results[0]
        })
      }
    }
  );
  
};

// BLOG UPDATE
module.exports.update = function (req, res) {
    
  conn.query(
    "UPDATE blog SET title = (?), text = (?) WHERE id = (?);",
    [req.body.title, req.body.text, req.params.id],
    function (err, results, fields) {
      if (err) {
        req.flash("error", err);
      }
    }
  );
  req.flash("success", "Blog Updated!");
  return res.redirect("/users/profile");
};