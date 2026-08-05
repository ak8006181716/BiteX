// Backend/src/models/Order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true,
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MenuItem',
        required:true,
    }],
    price:{
        type:Number,
        required:true,  
    },
    
    

},{timestamps: true});


const Order = mongoose.model("Order",orderSchema);


export {Order};

