// Backend/src/models/Category.model.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    

},{timestamps: true});

const Category = mongoose.model("Category",categorySchema);

export {Category};