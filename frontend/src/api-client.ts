import axiosClient from "./axiosClient";
import { SignUpFormData } from "./pages/SignUp";

 export const signUp = async(formData:SignUpFormData)=>{
    const res = await axiosClient.post('/users/register', formData)
    if(res.status!==200){
        throw new Error(res.data.message)
    
    }
}


