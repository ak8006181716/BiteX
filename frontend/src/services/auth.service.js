import { registerUser } from "../api/auth.api.js";
import { loginUser } from "../api/auth.api.js";
import { logoutUser } from "../api/auth.api.js";

export const RegisterUser = async (formData) => {
    const response =await registerUser(formData)
    return response
}


export const LoginUser = async (formData)=>{
    const response = await loginUser(formData)
    return response
}


export const LogoutUser =async()=>{
    const response = await logoutUser()
    return response
}
