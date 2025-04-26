    const express = require('express');
    const router = express.Router();
    const User = require("../models/user.js");
    const wrapAsync = require('../utils/wrapAsync.js');
    const passport = require('passport');




    //SignUp
    router.get("/signup",(req,res)=>{
        res.render("User/signup.ejs");
    });

    router.post("/signup",wrapAsync(async(req,res)=>{
        try{
            let {email,username,password} = req.body;
            const newUser = new User({email,username});
            let registeredUser = await User.register(newUser,password);
            console.log(registeredUser);
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        } catch(e){
            req.flash("error",e.message);
            res.redirect("/signup");
        }
    }));
    //----------


    // Login 
    router.get("/login",(req,res)=>{
        res.render("User/login.ejs");
    });

    router.post("/login",
        passport.authenticate("local", 
        {failureRedirect: "/login",failureFlash: true}) ,
        async(req,res)=>{
            req.flash("success","Welcome back to WanderLust !");
            res.redirect("/listings");
    });

    //---------

    module.exports = router;
