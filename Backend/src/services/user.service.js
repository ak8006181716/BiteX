import { User } from "../models/User.model.js";
import apiError from "../utils/ApiError.js";
import {
  uploadToCloudinary,
  deleteFileOnCloudinary
} from "../config/cloudinary.js";


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


const updateUserProfileServices = async (userid, updates, file) => {
  if (!userid) throw new apiError(400, "user ID required!");
  const oldUser = await User.findById(userid);
  if (!oldUser) throw new apiError(404, "User not found!")
  if (file) {
    const uploadImage = await uploadToCloudinary(file.path, "avatar");
    if (!uploadImage) throw new apiError(500, "Error in uploading file on cloudinary");
    updates.avatar = uploadImage.secure_url
    updates.avatarPublicId = uploadImage.public_id
  }
  const UpdatedUser = await User.findByIdAndUpdate(userid, updates, { new: true, runValidators: true, });
  if (oldUser.avatarPublicId) {
    const deletefile = await deleteFileOnCloudinary(oldUser.avatarPublicId)
    if (deletefile !== "ok") throw new apiError(500, "server Error old file not delete !");
  }

  return UpdatedUser;
}

const updatePasswordServices = async ({userid, oldPassword, newPassword, confirmPassword})=>{
  if(!userid) throw new apiError(404, "invalid userId");
  if(!oldPassword||!newPassword||!confirmPassword) throw new apiError(400, "old password , new password, and confirm password required");
  if(newPassword !== confirmPassword) throw new apiError(400, "new password or confirm password are not same!");
  if(oldPassword===newPassword) throw new apiError(400,"new password must be different from the old password");
  const user = await User.findById(userid);
  if(!user)throw new apiError(404,"user not found")
  const checkPass = await user.isPasswordCorrect(oldPassword);
  if(!checkPass) throw new apiError(401,"Wrong Password");
  user.password = newPassword
  await user.save()
  return user;

}


const deleteUserServices = async(userId)=>{
  if(!userId) throw new apiError(401, "Unauthorized")
    const user = await User.findByIdAndDelete(userId);
  if(!user) throw new ApiError(404, "User not found");

  return user;
}



export {
  registerUserService,
  loginUserService,
  logoutUserService,
  getUserProfileService,
  updateUserProfileServices,
  deleteUserServices
};
