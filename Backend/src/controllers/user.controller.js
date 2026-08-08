import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/ApiResponse.js";

import {
  registerUserService,
  loginUserService,
  logoutUserService,
  getUserProfileService,
  updateUserProfileServices,
} from "../services/user.service.js";




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

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await getUserProfileService(req.user?._id);
  return res.status(200).json(new apiResponse(200, user, "User profile retrieved successfully"));
});

const updateUserProfile = asyncHandler(async(req,res,next)=>{
  const user = await updateUserProfileServices(req.params.id, req.body,req.file)

  return res.status(200)
    .json(new apiResponse(200,user,"user update successfully"));

})




export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile
}
