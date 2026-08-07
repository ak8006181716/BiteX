import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/ApiError.js"

const verifyJWT = asyncHandler(async (req, res, next)=>{
    const Token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if(!Token) throw new apiError(401, "Unauthorized request")


const decodedToken = await jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)

const user = await User.findById(decodedToken?._id).select("-password");

if(!user) throw new apiError(401,"Invalid access token")

req.user = user;
next();

});

export default verifyJWT;