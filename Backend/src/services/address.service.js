import { Address } from "../models/Address.model.js";
import { User } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";



const addAddressServices = async(userid, addressData) =>{
    if(!userid) throw new ApiError(404,"User not Found");
    const{name,street,city,state,pincode,country,landmark,isDefault,latitude,longitude} = addressData;

    if(!street||!city||!state||!pincode||!country||!latitude||!longitude) throw new ApiError(401, "All fields are requered");
    addressData.user = userid
    const address = await Address.create(addressData);
    if(!address) throw new ApiError(500,"Error creating address in db !");
    return address;
}

const updateAddressServices = async(addressId,userId,update)=>{
    if (!userId) throw new ApiError(401, "Unauthorized");
    if(!addressId) throw new ApiError(404,"Address id is required");

    const newaddress = await Address.findByIdAndUpdate(addressId,update,{new:true});
    if(!newaddress) throw new ApiError(404,"Address not found");
    return newaddress;
}

const deleteAddressServices = async(userId,addressId)=>{
    if(!userId) throw new ApiError(401,"Unauthorized");
    const deletedAddress = await Address.findByIdAndDelete(addressId);
    if(!deletedAddress) throw new ApiError(404,"Address not found");
    return deletedAddress;
}

const getAddressByIdService = async (userId,addressId) => {
    if(!userId) throw new ApiError(401,"Unauthorized");
    const addressByID = await Address.findById(addressId);
    if(!addressByID) throw new ApiError(404,"Address not found");
    return addressByID;
}

const getAllAddressService = async(userId)=>{
    if(!userId) throw new ApiError(401,"Unauthorized");
    const addresses = await User.find({
        user :userId
    });

    if(!addresses) throw new ApiError(404,"No address found")
    return addresses;
}

export {
    getAddressByIdService,
    getAllAddressService,
    addAddressServices,
    updateAddressServices,
    deleteAddressServices
}