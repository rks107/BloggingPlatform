const conn = require("../config/mysql");

module.exports.create = function (req, res) {
   console.log(req.body);
  conn.query(
    "INSERT INTO blog (user_id, title, text) VALUES (?, ?, ?);",
    [req.user.id, req.body.title, req.body.text],
    function (err, results, fields) {
      if (err) throw err;
      else console.log("Inserted " + results.affectedRows + " row(s).");
    }
  );
  return res.redirect("/users/profile");
};

// BLOG DELETE
module.exports.delete = function (req, res) {

  conn.query("DELETE FROM blog WHERE id = (?);", [req.params.id], function (
    err,
    results,
    fields
  ) {
    if (err) throw err;
    else console.log("Inserted " + results.affectedRows + " row(s).");
  });
  return res.redirect("back");
};

// Refer to form for updating blog
module.exports.refToUpdateBlog = function (req, res) {
    console.log(req.params.id);
  conn.query(
    "select * from blog WHERE id = (?);",
    [req.params.id],
    function (err, results, fields) {
      if (err) {
        return res.redirect("back");
        
      } else {
          console.log(results[0]);
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
    console.log("UPDATEd",req.body);
  conn.query(
    "UPDATE blog SET title = (?), text = (?) WHERE id = (?);",
    [req.body.title, req.body.text, req.params.id],
    function (err, results, fields) {
      if (err) throw err;
      else console.log("Inserted " + results.affectedRows + " row(s).");
    }
  );
  return res.redirect("/users/profile");
};