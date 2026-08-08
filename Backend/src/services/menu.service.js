import { Menu } from "../models/Menu.model.js";
import { Restaurant } from "../models/Restaurant.model.js";
import { MenuItem } from "../models/MenuItem.model.js";
import apiError from "../utils/ApiError.js";

const createMenuService = async ({ restaurantId, name, description }) => {
  if (!restaurantId || !name || !description) {
    throw new apiError(400, "Restaurant ID, name and description are required");
  }

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new apiError(404, "Restaurant not found");
  }

  return Menu.create({
    restaurant: restaurantId,
    name,
    description,
  });
};

const getMenuByIdService = async (menuId) => {
  if (!menuId) {
    throw new apiError(400, "Menu ID is required");
  }

  const menu = await Menu.findById(menuId)
    .populate("restaurant", "-__v")
    .populate("items", "-__v");

  if (!menu) {
    throw new apiError(404, "Menu not found");
  }

  return menu;
};

const updateMenuService = async (menuId, updates) => {
  if (!menuId) {
    throw new apiError(400, "Menu ID is required");
  }

  const { name, description } = updates;

  const updatedMenu = await Menu.findByIdAndUpdate(
    menuId,
    { name, description },
    { new: true, runValidators: true }
  )
    .populate("restaurant", "-__v")
    .populate("items", "-__v");

  if (!updatedMenu) {
    throw new apiError(404, "Menu not found");
  }

  return updatedMenu;
};

const deleteMenuService = async (menuId) => {
  if (!menuId) {
    throw new apiError(400, "Menu ID is required");
  }

  const menu = await Menu.findById(menuId);
  if (!menu) {
    throw new apiError(404, "Menu not found");
  }

  await Menu.findByIdAndDelete(menuId);
  return null;
};

const addMenuItemToMenuService = async (menuId, data) => {
  if (!menuId) {
    throw new apiError(400, "Menu ID is required");
  }

  const menu = await Menu.findById(menuId);
  if (!menu) {
    throw new apiError(404, "Menu not found");
  }

  const { restaurantId, name, description, price, category, image, isVeg, preparationTime } = data;

  if (!restaurantId || !name || !price) {
    throw new apiError(400, "Restaurant ID, name and price are required");
  }

  return MenuItem.create({
    restaurant: restaurantId,
    menu: menuId,
    name,
    description,
    price,
    category,
    image,
    isVeg,
    preparationTime,
  });
};

const deleteMenuItemFromMenuService = async (menuItemId) => {
  if (!menuItemId) {
    throw new apiError(400, "Menu item ID is required");
  }

  const deletedMenuItem = await MenuItem.findByIdAndDelete(menuItemId);
  if (!deletedMenuItem) {
    throw new apiError(404, "Menu item not found");
  }

  return null;
};

const updateMenuItemService = async (menuItemId, updates) => {
  if (!menuItemId) {
    throw new apiError(400, "Menu item ID is required");
  }

  const updatedMenuItem = await MenuItem.findByIdAndUpdate(menuItemId, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedMenuItem) {
    throw new apiError(404, "Menu item not found");
  }

  return updatedMenuItem;
};

export {
  createMenuService,
  getMenuByIdService,
  updateMenuService,
  deleteMenuService,
  addMenuItemToMenuService,
  deleteMenuItemFromMenuService,
  updateMenuItemService,
};
