import asyncHandler from "../utils/asyncHandler.js";
import verifyJWT from "./auth.middleware.js";
import apiError from "../utils/ApiError.js";

const authorize = (...roles) =>
  asyncHandler(async (req, res, next) => {
    const userRole = req.user?.role;

    if (!roles.includes(userRole)) {
      throw new apiError(
        403,
        "Access denied, you are not authorized to perform this action"
      );
    }

    next();
  });

export { authorize };