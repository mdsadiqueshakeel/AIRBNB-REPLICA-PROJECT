const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middlewares/isLogin.js");


// Internal server validation middleware


//index route 1
router.get("/",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index",{allListings});
}));
//-----------------------


//new form route 3
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new"); 
});

router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{   
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user;
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
}));
//-----------------------

//edit route 4
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for that does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync(async (req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}));

//------------------------- 

//delete route 5

router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req,res)=>{
    let {id} =req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}));

//-----------------------


//show route 2
router.get("/:id",wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for that does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}));
//-----------------------

module.exports = router;