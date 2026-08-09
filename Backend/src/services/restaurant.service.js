import { model } from "mongoose";
import { Restaurant } from "../models/Restaurant.model.js";
import apiError from "../utils/ApiError.js";

const createRestaurantService = async ({ name, address, userId }) => {
  if (!name || !address) {
    throw new apiError(400, "Name and address are required");
  }

  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  return Restaurant.create({
    name,
    address,
    owner: userId,
  });
};

const getRestaurantByIdService = async (restaurantId) => {
  if (!restaurantId) {
    throw new apiError(400, "Restaurant ID is required");
  }

  const restaurant = await Restaurant.findById(restaurantId)
    .populate("address")
    .populate("owner", "-password")
    .populate({
      path: "menu",
      select: "-__v",
    });

  if (!restaurant) {
    throw new apiError(404, "Restaurant not found");
  }

  return restaurant;
};

const updateRestaurantService = async (restaurantId, updates) => {
  if (!restaurantId) {
    throw new apiError(400, "Restaurant ID is required");
  }

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new apiError(404, "Restaurant not found");
  }

  const { name, address, isOpen, isVerified, isActive } = updates;

  if (name) restaurant.name = name;
  if (address) restaurant.address = address;
  if (isOpen !== undefined) restaurant.isOpen = isOpen;
  if (isVerified !== undefined) restaurant.isVerified = isVerified;
  if (isActive !== undefined) restaurant.isActive = isActive;

  await restaurant.save();
  return restaurant;
};

const deleteRestaurantService = async (restaurantId) => {
  if (!restaurantId) {
    throw new apiError(400, "Restaurant ID is required");
  }

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new apiError(404, "Restaurant not found");
  }

  await Restaurant.findByIdAndUpdate(restaurant,{isActive:false},{new :true});
  return null;
};

const getAllRestaurantServices = async(search = '', page = 1, limit = 20)=>{
    const skip = (page - 1) * limit;
    const filter ={}
     if(search){
      filter.name={
        $regex:search,
        $options:"i"
      };
     }

    const restaurant = await Restaurant.find(filter).skip(skip).limit(limit);

     const totalRestaurant = await Restaurant.countDocuments(filter);
      if(!restaurant.length) throw new apiError(404,"Restaurants not found");
     
      const totalPage = Math.ceil(totalRestaurants / limit);

      const hasNextPage = page < totalPage;


     return {
      restaurant,
      pagination:{
        totalRestaurant,
        totalPage,
        hasNextPage,
        currentPage:page,
      }
     }
}


const getMyRestaurantServices = async (userId,restaurantId)=>{
  if(!restaurantId) throw new apiError(400, "Restaurant Owner Id Required");

  const myRestaurant = await Restaurant.findById(restaurantId);
      if(!myRestaurant) throw new apiError(404, "Restourent not found");

    if (!myRestaurant.owner.equals(userId)) throw new apiError(403, "Unauthorized");




    return myRestaurant;

}

const changeRestaurantStausService = async(userId,restaurantId)=>{

    if(!userId) throw new apiError(400,"Need user Id");
    if(!restaurantId) throw new apiError(400,"Need restaurant Id");
    const checkOwner = await Restaurant.findById(restaurantId);
    if(!checkOwner) throw new apiError(404,"No Restaurant found !")
    if (!checkOwner.owner.equals(userId)) throw new apiError(403, "Unauthorized");
    const newAction = !checkOwner.isOpen;
    const changeStatus = await Restaurant.findByIdAndUpdate(restaurantId,{isOpen : newAction},{new:true});
    if (!changeStatus) throw new apiError(500,"Server Error Changin status")
    return changeStatus;
}

const getRestaurantMenuService = async (restaurantId)=>{
  if(!restaurantId) throw new apiError(400,"restaurant Id is required");
  const restaurantMenu = await Restaurant
  .findById(restaurantId)
  .populate({
    path:menu,
    populate:{
      path:items,
      model:"MenuItem"
    }
  })
  if(!restaurantMenu) throw new apiError(404, "No restaurant found with this ID");

  return restaurantMenu.menu || [];
}



export {
  createRestaurantService,
  getRestaurantByIdService,
  updateRestaurantService,
  deleteRestaurantService,
  getAllRestaurantServices,
  getMyRestaurantServices,
  changeRestaurantStausService,
  getRestaurantMenuService
};
