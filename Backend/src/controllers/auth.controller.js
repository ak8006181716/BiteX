import {User} from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/ApiError.js";
import apiResponse from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, firstName, lastName,phone } = req.body;
  console.log(req.body)
  if(!username || !email || !password || !firstName || !lastName || !phone) throw new apiError(400, "All fields are required");


  const pastuser= await User.findOne({email});
  if(pastuser) throw new apiError(400, "User already exists with this email");

  const user = await User.create({username,email,password,firstName,lastName,phone})
  if(!user) throw new apiError(500, "Error while registering the user");

  return res.status(201)
  .cookie("token", user.generateAccessToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })
  .json(new apiResponse(200, user, "User registered successfully"));

});


const loginUser = asyncHandler(async (req, res, next) => {
const {email, password} = req.body;
if(!email || !password) throw new apiError(400,"Email and Password are required");
  const user = await User.findOne({email}).select("+password");
  if(!user) throw new apiError(400, "User not found");
  
  const isMatch = await user.isPasswordCorrect(password);
  if(!isMatch) throw new apiError(400,"Wrong password");

  return res
  .status(201)
  .cookie("token",user.generateAccessToken(),{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
  })
  .json(new apiResponse(200, user, "User lonin successfully"));
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json(new apiResponse(200, null, "User logged out successfully"));
})

export {
  loginUser,
  registerUser,
  logoutUser,

}