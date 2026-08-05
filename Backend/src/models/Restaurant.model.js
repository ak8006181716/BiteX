// Backend/src/models/Restaurant.model.js

import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({ 
    name:{
        type: String,
        required: true,
        trim: true,
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    menu:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
    },
    rating:{
        type: Number,
        default: 0,
    },
    isOpen:{
        type: Boolean,
        default: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
},{timestamps: true});


const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export { Restaurant };
