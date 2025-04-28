const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middlewares/isLogin.js");
const listingControllers = require("../controllers/listing.js");

const {storage} = require("../cloudConfig.js")
const multer  = require('multer');
const upload = multer({storage});


router.get("/new",isLoggedIn,listingControllers.renderNewForm);

router.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControllers.createNewListing)
);

router.route("/:id")
.get(wrapAsync(listingControllers.showListings))
.delete(isLoggedIn,isOwner, wrapAsync(listingControllers.deleteListing))
.put(isLoggedIn,isOwner,
    upload.single("listing[image]"), 
    validateListing,
    wrapAsync(listingControllers.updateListing));

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingControllers.renderEditForm));


module.exports = router;