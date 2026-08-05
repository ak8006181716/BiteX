import express from "express";
import { registerUser,loginUser, logoutUser } from "../controllers/auth.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = express.Router();





export default userRouter;