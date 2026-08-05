import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    dishImage:{
        type:String,
        default:"https://res.cloudinary.com/dxjv0gq3f/image/upload/v1697040915/food-default-image_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1.png",
    },
    isVeg:{
        type:Boolean,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    discountprice:{
        type:Number,
    },
    preparationTime:{
        type:Number,
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5,
    },
    totalReviews:{
        type:Number,
        default:0,
    },
    tags:[{
        type:String,
        trim:true,
    }]


},{timestamps: true});

const Dish = mongoose.model("Dish",dishSchema);
export {Dish};