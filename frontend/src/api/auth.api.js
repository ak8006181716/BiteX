import axios from "axios";
const backendurl = import.meta.env.VITE_BACKEND_URL ||"http://localhost:3000";
axios.defaults.withCredentials = true;
export async function registerUser(userData){
    try {
        const response = await axios.post(`${backendurl}/api/user/register`,userData)
        return response.data;
    } catch (error) {
        console.error('Error during reg',error);
        throw error;  
    }
}


export async function loginUser(userData){
    try {
        const response = await axios.post(`${backendurl}/api/user/login`,userData)
        return response.data;
    } catch (error) {
        console.error("Error during login", error);
        throw error;
    }
}


export async function logoutUser(){
    try {
        const response = await axios.post(`${backendurl}/api/user/logout`)
        return response.data;
    } catch (error) {
        console.error('Error during logout',error);
        throw error;    
    }
}