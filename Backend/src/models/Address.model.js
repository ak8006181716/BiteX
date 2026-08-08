import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    street: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    pincode: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    latitude:{
        type:String,
        required:true,
    },
    longitude:{
        type:String,
        required:true,
    },
    landmark:{
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User',
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


const Address = mongoose.model("Address",addressSchema);

export {Address};

 