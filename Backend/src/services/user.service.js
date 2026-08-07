import { User } from "../models/User.model.js";
import apiError from "../utils/ApiError.js";

const registerUserService = async ({ email, password, firstName, lastName, phone }) => {
  if (!email || !password || !firstName || !lastName || !phone) {
    throw new apiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new apiError(400, "User already exists with this email");
  }

  const user = await User.create({ email, password, firstName, lastName, phone });
  if (!user) {
    throw new apiError(500, "Error while registering the user");
  }

  return user;
};

const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new apiError(400, "Email and Password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new apiError(400, "User not found");
  }

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new apiError(400, "Wrong password");
  }

  return user;
};

const logoutUserService = async () => null;

const getUserProfileService = async (userId) => {
  if (!userId) {
    throw new apiError(400, "User Id is required");
  }

  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new apiError(404, "User not found");
  }

  return user;
};

export {
  registerUserService,
  loginUserService,
  logoutUserService,
  getUserProfileService,
};
