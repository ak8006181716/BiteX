import { Restaurant } from "../models/restaurant.model.js";
import { Menu } from "../models/Menu.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";



// Create a New Restaurant

const createrestaurant = asyncHandler(async (req, res, next) => {
    const { name, address } = req.body;

    if (!name || !address) {
        throw new apiError(400, "Name and address are required");
    }
    if (!req.user || !req.user._id) throw new apiError(401, "Unauthorized");

    const restaurant = await Restaurant.create({
        name,
        address,
        owner: req.user._id,
    });

    return res.status(201).json(new apiResponse(200, restaurant, "Restaurant created successfully"));

});


const getRestaurantById = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.id;
    if (!restaurantId) throw new apiError(400, "Restaurant ID is required");
    const restaurant = await Restaurant.findById(restaurantId)
        .populate("address")
        .populate("owner", "-password")
        .populate({
            path: "menu",
            select: "-__v",
        });
    if (!restaurant) throw new apiError(404, "Restaurant not found");
    return res.status(200).json(new apiResponse(200, restaurant, "Restaurant retrieved successfully"));
});

const updateRestaurant = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.id;
    if (!restaurantId) throw new apiError(400, "Restaurant ID is required");
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new apiError(404, "Restaurant not found");
    const { name, address, isOpen, isVerified, isActive } = req.body;
    if (name) restaurant.name = name;
    if (address) restaurant.address = address;
    if (isOpen !== undefined) restaurant.isOpen = isOpen;
    if (isVerified !== undefined) restaurant.isVerified = isVerified;
    if (isActive !== undefined) restaurant.isActive = isActive;
    await restaurant.save();
    return res.status(200).json(new apiResponse(200, restaurant, "Restaurant updated successfully"));
});

const deleteRestaurant = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.id;
    if (!restaurantId) throw new apiError(400, "Restaurant ID is required");
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new apiError(404, "Restaurant not found");
    await restaurant.remove();
    return res.status(200).json(new apiResponse(200, null, "Restaurant deleted successfully"));
});


export {
    createrestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
}
