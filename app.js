if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");

const ExpressError = require("./utils/ExpressError.js");

const listingsRoute = require("./routes/listing.routes.js");
const reviewsRoute = require("./routes/review.routes.js");
const UsersRoute = require("./routes/user.routes.js");

const User = require("./models/user.js");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"public")));

const dbUrl = process.env.ATLASDB_URL;


const store =  MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret : process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60,
  });

store.on("erroe", ()=>{
    console.log("ERROR in MONGODB SESSION STORE : ", err);
});

const sessionOption = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    },
};


main()
.then(()=>{
    console.log("connected to DB");
})
.catch(err =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});



app.use("/listings",listingsRoute);
app.use("/listings/:id/reviews",reviewsRoute);
app.use("/",UsersRoute);


app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});


//Error Handling Middleware
app.use((err,req,res,next)=>{
    let{statusCode=500, message="something went wrong"} = err;
    res.status(statusCode).render("listings/error.ejs",{message});
});

//-----------------------


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
