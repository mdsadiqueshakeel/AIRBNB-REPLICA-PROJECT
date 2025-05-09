    const express = require('express');
    const router = express.Router();
    const wrapAsync = require('../utils/wrapAsync.js');
    const passport = require('passport');
    const { saveRedirectUrl } = require('../middlewares/isLogin.js');
    const userController = require("../controllers/user.js");



    router.route("/signup")
    .get(userController.renderSignupPage)
    .post(wrapAsync(userController.signUp));
    
    router.route("/login")
    .get(userController.renderLoginPage)
    .post(saveRedirectUrl,passport.authenticate("local", {failureRedirect: "/login",failureFlash: true}) ,userController.login);

    router.get("/logout",userController.logout);

    module.exports = router;
