const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs_controller");
const passport = require("passport");



router.post("/create", passport.checkAuthentication, blogController.create);
router.get("/delete/:id", passport.checkAuthentication, blogController.delete);

router.get("/update-blog/:id", passport.checkAuthentication, blogController.refToUpdateBlog);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  blogController.update
);

module.exports = router;