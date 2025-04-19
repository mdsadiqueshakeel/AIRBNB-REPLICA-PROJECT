const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"public")));


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// app.use("/listings",(req,res,next)=>{
//     req.responseTime = new Date(Date.now()).toString().split(" ").splice(0,5).join("-");
//     console.log(req.responseTime, req.path, req.method, req.hostname);
//     next();
// });

main()
.then(()=>{
    console.log("connected to DB");
})
.catch(err =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});

// Internal server validation middleware
let validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

let validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//index route 1
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index",{allListings});
}));
//-----------------------


//new form route 3
app.get("/listings/new",(req,res)=>{
    res.render("listings/new"); 
});

app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{   
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));
//-----------------------

//edit route 4
app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);


    res.render("listings/edit.ejs",{listing});
}));

app.put("/listings/:id",validateListing, wrapAsync(async (req,res)=>{
    
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//------------------------- 

//delete route 5

app.delete("/listings/:id", wrapAsync(async (req,res)=>{
    let {id} =req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
}));

//-----------------------


//show route 2
app.get("/listings/:id",wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}));
//-----------------------

//Reviews
//Post route for reviews

app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res,next)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("new Review :",newReview);
    res.redirect(`/listings/${id}`);
}));

//Delete route for reviews
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    const {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);   
    res.redirect(`/listings/${id}`); 
}));

// app.use("*",(req,res,next)=>{
//     next(new ExpressError(404 ,"Page not found"));
// });

// app.use((req, res, next) => {
//     if (!res.headersSent) { // Check if a response has already been sent
//       next(new ExpressError(404, "Page not found"));
//     } else {
//       next(); // If a response was sent, move to the next middleware (e.g., error handler)
//     }
//   });

app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
  });

//Error Handling Middleware
app.use((err,req,res,next)=>{
    let{statusCode=500, message="something went wrong"} = err;
    res.status(statusCode).render("listings/error.ejs",{message});
    // res.status(statusCode).send(message);
});

//-----------------------


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
