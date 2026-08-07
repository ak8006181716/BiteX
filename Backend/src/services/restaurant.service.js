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

  await restaurant.deleteOne();
  return null;
};

export {
  createRestaurantService,
  getRestaurantByIdService,
  updateRestaurantService,
  deleteRestaurantService,
};
