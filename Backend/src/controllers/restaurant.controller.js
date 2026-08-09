import { asyncHandler } from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import {
    createRestaurantService,
  getRestaurantByIdService,
  updateRestaurantService,
  deleteRestaurantService,
  getAllRestaurantServices,
  getMyRestaurantServices,
  changeRestaurantStausService,
  getRestaurantMenuService,
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

const getAllRestaurant = asyncHandler(async(req,res,next)=>{
    const allRestaurant = await getAllRestaurantServices(req.query.search,req.query.limit,req.query.page);

    return res.status(200).json(new apiResponse(200,allRestaurant,"All Restaurants !"));
})

const getMyRestaurant = asyncHandler(async(req,res,next)=>{
    const myRestaurant = await getMyRestaurantServices(req.user._id,req.params.id);
    return res.status(200).json(new apiResponse(200, myRestaurant, "Restaurant "))
})

const changeRestaurantStaus = asyncHandler(async (req,res,next)=>{
    const Status = await changeRestaurantStausService(req.user.id,req.params.restaurantId);

    return res.status(200).json(new apiResponse(200,Status,"Restaurant Status is changed"));
})

const getRestaurantMenu = asyncHandler(async (req,res,next)=>{
    const getMenu = await getRestaurantMenuService(req.user.id,req.params.restaurantId)

    return res.status(200).json(new apiResponse(200,getMenu,"Menu fetched successfully"))
})

export {
    createrestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    getAllRestaurant,
    getMyRestaurant,
    changeRestaurantStaus,
    getRestaurantMenu,
}
