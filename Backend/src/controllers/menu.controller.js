// Backend/src/controllers/menu.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/ApiResponse.js";
import { Menu } from "../models/Menu.model.js";
import { Restaurant } from "../models/Restaurant.model.js";
import { MenuItem } from "../models/MenuItem.model.js";


const createMenu = asyncHandler(async (req, res, next) => {
    const { restaurantId, name, description } = req.body;
    if (!restaurantId || !name || !description) throw new apiError(400, "Restaurant ID, name and description are required");
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new apiError(404, "Restaurant not found");
    const menu = await Menu.create({
        restaurant: restaurantId,
        name,
        description
    });
    return res.status(201).json(new apiResponse(200, menu, "Menu created successfully"));
});

const getMenuById = asyncHandler(async (req, res, next) => {
    const menuId = req.params.id;
    if (!menuId) throw new apiError(400, "Menu ID is required");
    const menu = await Menu.findById(menuId)
        .populate("restaurant", "-__v")
        .populate("items", "-__v");
    if (!menu) throw new apiError(404, "Menu not found");
    return res.status(200).json(new apiResponse(200, menu, "Menu retrieved successfully"));
});

const updateMenu = asyncHandler(async (req, res, next) => {
    const menuId = req.params.id;
    if (!menuId) throw new apiError(400, "Menu ID is required");
    const menu = await Menu.findById(menuId);
    if (!menu) throw new apiError(404, "Menu not found");
    const { name, description } = req.body;
    const updatedMenu = await Menu.findByIdAndUpdate(menuId, { name, description }, { new: true })
        .populate("restaurant", "-__v")
        .populate("items", "-__v");
    if (!updatedMenu) throw new apiError(404, "Menu not found");
    return res.status(200).json(new apiResponse(200, updatedMenu, "Menu updated successfully"));
});

const deleteMenu  = asyncHandler(async (req, res, next) => {
    const menuId = req.params.id;
    if (!menuId) throw new apiError(400, "Menu ID is required");
    const menu = await Menu.findById(menuId);
    if (!menu) throw new apiError(404, "Menu not found");
    await Menu.findByIdAndDelete(menuId);
    return res.status(200).json(new apiResponse(200, null, "Menu deleted successfully"));
});

const addMenuItemToMenu = asyncHandler(async (req, res, next) => {
    const menuId = req.params.id;
    if (!menuId) throw new apiError(400, "Menu ID is required");
    // const menu = await Menu.findById(menuId);
    // if (!menu) throw new apiError(404, "Menu not found");
    const { restaurantId, name, description, price, category, image, isVeg, preparationTime } = req.body;
    if (!restaurantId || !name || !price) throw new apiError(400, "Restaurant ID, name and price are required");
    const menuItem = await MenuItem.create({
        restaurant: restaurantId,
        name,
        description,
        price,
        category,
        image,
        isVeg,
        preparationTime
    });
    return res.status(201).json(new apiResponse(200, menuItem, "Menu item created successfully"));
});

const deleteMenuItemFromMenu = asyncHandler(async (req, res, next) => {
    const menuItemId = req.params.id;
    if (!menuItemId) throw new apiError(400, "Menu item ID is required");
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) throw new apiError(404, "Menu item not found");
    await MenuItem.findByIdAndDelete(menuItemId);
    return res.status(200).json(new apiResponse(200, null, "Menu item deleted successfully"));
});

export{
    createMenu,
    getMenuById,
    updateMenu,
    deleteMenu,
    addMenuItemToMenu,
    deleteMenuItemFromMenu
}
