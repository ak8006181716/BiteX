// Backend/src/models/Category.model.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true,
    },
    description:{
        type:String,
        trim:true,
    },
    categoryImage:{
        type:String,
        default:"",
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    
    

},{timestamps: true});

const Category = mongoose.model("Category",categorySchema);

export {Category};