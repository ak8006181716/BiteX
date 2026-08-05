import express from "express";
import { 
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {authorize} from "../middlewares/role.middleware.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.get("/profile",verifyJWT, authorize("admin"), getUserProfile);

export default userRouter;