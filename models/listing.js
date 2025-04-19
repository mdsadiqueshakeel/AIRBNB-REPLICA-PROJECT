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
        filename: String,
        url:{

            type: String,
            default:"https://plus.unsplash.com/premium_photo-1664127534884-d80b9a5ef8b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set:(v) => v==="" ? "https://plus.unsplash.com/premium_photo-1664127534884-d80b9a5ef8b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
        },
        },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

listingSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await review.deleteMany({ _id: {$in: doc.reviews} });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing; 