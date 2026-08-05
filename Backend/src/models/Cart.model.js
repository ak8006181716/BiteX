// Backend/src/models/Cart.model.js
import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MenuItem',
    }],
    isActive:{
        type:Boolean,
        default:true,
    },
    
    
    
},{timestamps: true});


const Cart = mongoose.model("Cart",cartSchema);

export {Cart};
