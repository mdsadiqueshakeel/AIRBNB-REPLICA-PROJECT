const Listing = require("../models/listing");
const axios = require('axios');

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index",{ showSearch: true ,allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs",); 
};

module.exports.showListings = async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for that does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.createNewListing = async(req,res,next)=>{  
    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user;
    newListing.image = {url,filename};

     // Fetch coordinates from Nominatim API
     const geoData = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q: newListing.location,    // location comes from the form
            format: 'json',
            limit: 1
        },
        headers: {
            'User-Agent': 'Wanderlust-App-Project' // Nominatim requires User-Agent
        }
    });

    
    if (geoData.data.length > 0) {
        newListing.geometry = {
            type: 'Point',
            coordinates: [
                parseFloat(geoData.data[0].lon),   // longitude first
                parseFloat(geoData.data[0].lat)    // latitude second
            ]
        };
    } else {
        req.flash('error', 'Location not found. Please try a different location.');
        return res.redirect('/listings/new');
    }

    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for that does not exist");
        return res.redirect("/listings");
    }

    
    let orignalImageUrl = listing.image.url  || listing.image;
    orignalImageUrl = orignalImageUrl.replace("/upload","/upload/c_fill,w_250,h_300");

    res.render("listings/edit.ejs",{listing,orignalImageUrl});
};

module.exports.updateListing = async (req,res)=>{
    let {id}= req.params;
    let listings = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file != "undefined"){
    let url = req.file.path
    let filename = req.file.filename;
    listings.image = {url, filename};

    // Fetch coordinates from Nominatim API
    const geoData = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q: listings.location,    // location comes from the form
            format: 'json',
            limit: 1
        },
        headers: {
            'User-Agent': 'Wanderlust-App-Project' // Nominatim requires User-Agent
        }
    });

    
    if (geoData.data.length > 0) {
        listings.geometry = {
            type: 'Point',
            coordinates: [
                parseFloat(geoData.data[0].lon),   // longitude first
                parseFloat(geoData.data[0].lat)    // latitude second
            ]
        };
    } else {
        req.flash('error', 'Location not found. Please try a different location.');
        return res.redirect(`/listings/${id}`);
    }

    await listings.save();
    }

    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req,res)=>{
    let {id} =req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};