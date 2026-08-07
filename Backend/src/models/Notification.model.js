// Backend/src/models/Notification.model.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type:String,
        required:true,
        trim:true,
    },
    

},{timestamps:true});


const Notification = mongoose.model("Notification",notificationSchema);

export {Notification};
