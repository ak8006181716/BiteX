import { asyncHandler } from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import {
    createRestaurantService,
    getRestaurantByIdService,
    updateRestaurantService,
    deleteRestaurantService,
} from "../services/restaurant.service.js";



// Create a New Restaurant

const createrestaurant = asyncHandler(async (req, res, next) => {
    const restaurant = await createRestaurantService({
        name: req.body.name,
        address: req.body.address,
        userId: req.user?._id,
    });

    return res.status(201).json(new apiResponse(200, restaurant, "Restaurant created successfully"));
});


const getRestaurantById = asyncHandler(async (req, res, next) => {
    const restaurant = await getRestaurantByIdService(req.params.id);
    return res.status(200).json(new apiResponse(200, restaurant, "Restaurant retrieved successfully"));
});

const updateRestaurant = asyncHandler(async (req, res, next) => {
    const restaurant = await updateRestaurantService(req.params.id, req.body);
    return res.status(200).json(new apiResponse(200, restaurant, "Restaurant updated successfully"));
});

const deleteRestaurant = asyncHandler(async (req, res, next) => {
    await deleteRestaurantService(req.params.id);
    return res.status(200).json(new apiResponse(200, null, "Restaurant deleted successfully"));
});


export {
    createrestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
}
