const conn = require("../config/mysql");





module.exports.home = function (req, res) {

  conn.query(
    `SELECT * FROM blog INNER JOIN user ON blog.user_id = user.id`,
    function (err, results, fields) {

      return res.render("home", {
        title: "Home",
        blogs: results,
      });
    }
  );
  
};