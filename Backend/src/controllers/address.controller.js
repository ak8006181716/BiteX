import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
    getAddressByIdService,
    getAllAddressService,
    addAddressServices,
    updateAddressServices,
    deleteAddressServices,

} from "../services/address.service.js"

const addAddress = asyncHandler(async (req,res,next) => {
    const user = await addAddressServices(req.user._id, req.body)

    return res.status(201).json(new ApiResponse(201),user,"Address created successfully!");
})

const updateAddress = asyncHandler(async (req,res,next)=>{
    const user =await updateAddressServices(req.params._id, req.user._id, req.body);

    return res.status(200).json(new ApiResponse(200,user,"Address update successfully!"))
})

const deleteAddress = asyncHandler(async(req,res,next)=>{
    const user =await deleteAddressServices(req.user._id,req.params._id);

    return res.status(200).json(new ApiResponse(200,"Address delete Successfully!"));
})

const getAddressById = asyncHandler(async(req,res,next)=>{
    const user =await getAddressByIdService(req.user._id,req.params._id);

    return res.status(200).json(new ApiResponse(200,user,"Fetch Address suceessfully!"));
})

const getAllAddress = asyncHandler(async (req,res,next)=>{
    const user = await getAllAddressService(req.user._id);

    return res.status(200).json(new ApiResponse(200,user,"All addresses fetched  successfully!"));
})

export {
    getAllAddress,
    getAddressById,
    deleteAddress,
    updateAddress,
    addAddress
}
