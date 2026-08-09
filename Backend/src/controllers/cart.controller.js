import Cart from "../models/Cart.model.js"
import ApiResponse from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"






const getMyCart = asyncHandler(async (req, res, next)=>{
    const myCart =await getMyCartService(req.user.id);

    return res.status(200)
    .json(new ApiResponse(200,myCart,"Cart fetched Successfully"));
})

const addItemToCart = asyncHandler(async (req,res,next)=>{
    const addedItem = await addItemToCartService(req.user.id,req.body)
})