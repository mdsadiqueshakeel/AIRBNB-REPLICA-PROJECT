const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn,isReviewAuthor,validateReview} = require("../middlewares/isLogin.js");

// Internal server validation middleware


//Post route for reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(async(req,res,next)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);

    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success","New Review Created");

    console.log("new Review :",newReview);
    res.redirect(`/listings/${id}`);
}));

//Delete route for reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(async(req,res)=>{
    const {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);   
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`); 
}));


module.exports = router;