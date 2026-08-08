import express from "express";
import { 
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile
} from "../controllers/user.controller.js";
import {uploadToCloudinary} from "../config/cloudinary.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {authorize} from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.get("/profile",verifyJWT, authorize("admin"), getUserProfile);
userRouter.post(
    "/upload",
    upload.single("avatar"),
    async (req, res) => {
        const uploadimage = await uploadToCloudinary(req.file.path,"avatar")
        
        res.json({
            file: req.file,
            url:uploadimage.secure_url,
            imageoutput:uploadimage
            
        });
    }
);


export default userRouter;