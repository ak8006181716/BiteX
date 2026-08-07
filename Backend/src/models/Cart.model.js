// Backend/src/models/Cart.model.js
import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema({
    menuItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MenuItem', 
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
        min:1,
    },
},
{_id:false}
);

const cartSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true,
    },
    items:{
        type:[cartItemSchema],
        default:[],
    },
},{timestamps: true});


const Cart = mongoose.model("Cart",cartSchema);

export {Cart};
