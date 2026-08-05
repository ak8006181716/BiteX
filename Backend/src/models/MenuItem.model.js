import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    menu:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    },
    name:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        trim: true,
    },
    price:{
        type:Number,
        required:true,
    },
    isAvailable:{
        type: Boolean,
        default: true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    image:{
        type: String
    },
    isVeg:{
        type:Boolean,
    },
    preparationTime:{
        type:Number,
    },
    rating:{
        type:Number,
        default:0,
    },
    totalReviews:{
        type:Number,
        default:0,
    },
    tags:{
        type:[String],
        default:[],
    }

},{timestamps: true});

const MenuItem = mongoose.model("MenuItem",menuItemSchema);


export {MenuItem};