const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
       type: String,
        required : true,
    },
    description: String,
    image:{ 
        url: String,
        filename: String,
        },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
            coordinates: {
            type: [Number], //[longitude,latitude]
            required: true
        }
    }
});

listingSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await review.deleteMany({ _id: {$in: doc.reviews} });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing; 