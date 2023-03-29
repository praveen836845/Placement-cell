const express = require("express");
const passport = require("passport");
const router = express.Router();

const { downloadCSVReport } = require("../controllers/csv_controller");
const usersController = require("../controllers/users_controller");
const dashboardController = require("../controllers/dashboard_controller");


router.get("/profile", passport.checkAuthentication, usersController.profile);
router.post("/update", passport.checkAuthentication, usersController.update);

router.get("/", usersController.signIn);
router.get("/sign-up", usersController.signUp);
router.get("/admin", dashboardController.dashboard);

// use passport as middleware to authenticate
//createing new user
router.post("/create", usersController.create);

router.post("/create-session", passport.authenticate('local',{failureRedirect:'/users/sign-in'}),usersController.create);

router.get("/sign-out", usersController.destroySession);
router.get("/download", downloadCSVReport);

module.exports = router;
