// Backend/src/routes/restaurant.routes.js
import express from "express"
import {
    createrestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    getAllRestaurant,
    getMyRestaurant,
    changeRestaurantStaus,
    getRestaurantMenu,
} from "../controllers/restaurant.controller.js"
import {uploadToCloudinary} from "../config/cloudinary.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {authorize} from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const restaurantRoute = express.Router();




