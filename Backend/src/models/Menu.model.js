// Backend/src/models/Menu.model.js
import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    name:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    items:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'MenuItem',
    },


},{timestamps: true});



const Menu = mongoose.model("Menu",menuSchema);

export { Menu };
