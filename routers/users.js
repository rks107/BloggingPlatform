const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const passport = require("passport");

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

router.get(
  "/profile",
  passport.checkAuthentication,
  usersController.profile
);

router.get("/delete", passport.checkAuthentication, usersController.delete);

router.get('/log-out', usersController.destroySession);

module.exports = router;