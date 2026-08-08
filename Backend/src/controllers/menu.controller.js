// Backend/src/controllers/menu.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import apiResponse from "../utils/ApiResponse.js";
import {
    createMenuService,
    getMenuByIdService,
    updateMenuService,
    deleteMenuService,
    addMenuItemToMenuService,
    deleteMenuItemFromMenuService,
    updateMenuItemService,
} from "../services/menu.service.js";

const createMenu = asyncHandler(async (req, res, next) => {
    const menu = await createMenuService(req.body);
    return res.status(201).json(new apiResponse(200, menu, "Menu created successfully"));
});

const getMenuById = asyncHandler(async (req, res, next) => {
    const menu = await getMenuByIdService(req.user._id);
    return res.status(200).json(new apiResponse(200, menu, "Menu retrieved successfully"));
});

const updateMenu = asyncHandler(async (req, res, next) => {
    const updatedMenu = await updateMenuService(req.user._id, req.body);
    return res.status(200).json(new apiResponse(200, updatedMenu, "Menu updated successfully"));
});

const deleteMenu = asyncHandler(async (req, res, next) => {
    await deleteMenuService(req.user._id);
    return res.status(200).json(new apiResponse(200, null, "Menu deleted successfully"));
});

const addMenuItemToMenu = asyncHandler(async (req, res, next) => {
    const menuItem = await addMenuItemToMenuService(req.user._id, req.body);
    return res.status(201).json(new apiResponse(200, menuItem, "Menu item created successfully"));
});

const deleteMenuItemFromMenu = asyncHandler(async (req, res, next) => {
    await deleteMenuItemFromMenuService(req.user._id);
    return res.status(200).json(new apiResponse(200, null, "Menu item deleted successfully"));
});

const updateMenuItem = asyncHandler(async (req, res, next) => {
    const updatedMenuItem = await updateMenuItemService(req.user._id, req.body);
    return res.status(200).json(new apiResponse(200, updatedMenuItem, "Menu item updated successfully"));
});

export {
    createMenu,
    getMenuById,
    updateMenu,
    deleteMenu,
    addMenuItemToMenu,
    deleteMenuItemFromMenu,
    updateMenuItem,
};
