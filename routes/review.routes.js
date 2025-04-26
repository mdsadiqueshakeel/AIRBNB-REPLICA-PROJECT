const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// Internal server validation middleware
let validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//Post route for reviews
router.post("/",validateReview,wrapAsync(async(req,res,next)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success","New Review Created");

    console.log("new Review :",newReview);
    res.redirect(`/listings/${id}`);
}));

//Delete route for reviews
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    const {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);   
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`); 
}));


module.exports = router;