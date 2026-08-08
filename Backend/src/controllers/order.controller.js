import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {createOrderService} from "../services/order.service.js"



const createOrder = asyncHandler(async (req,res,next)=>{
    const order = createOrderService(req.user._id,req.body);

    return res
    .status(200)
    .json(new ApiResponse(201,order,"Order create Successfully!"));
})


