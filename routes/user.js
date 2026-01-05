const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const usersController = require('../controllers/users.js');

//signup routes
router.route("/signup")
.get(usersController.renderSignupForm)
.post(wrapAsync(usersController.signup));

//login routes
router.route("/login")
.get(usersController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate('local',
    { failureRedirect: '/login', failureFlash: true, }),
    wrapAsync(usersController.login)
);

//logout route
router.get("/logout", usersController.logoutUser);

module.exports = router;