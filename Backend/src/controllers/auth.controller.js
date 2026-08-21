// import {User} from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/ApiError.js";
import apiResponse from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  return res.status(201)
    .cookie("token", user.generateAccessToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .json(new apiResponse(200, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const user = await loginUserService(req.body);

  return res
    .status(201)
    .cookie("token", user.generateAccessToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .json(new apiResponse(200, user, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res, next) => {
  await logoutUserService();
  res.clearCookie("token");
  return res.status(200).json(new apiResponse(200, null, "User logged out successfully"));
});
export {
    loginUser,
    registerUser,
    logoutUser
}