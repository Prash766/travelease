import { AxiosError } from "axios";
import axiosClient from "./axiosClient";
import { SignUpFormData } from "./pages/SignUp";
import { SignInForm } from "./pages/Login";

 export const signUp = async(formData:SignUpFormData)=>{
    const res = await axiosClient.post('/users/register', formData)
    if(res.status!==200){
        throw new Error(res.data.message)
    
    }
}

export const signIn = async(formData:SignInForm)=>{
    const res = await axiosClient.post('/users/login' , formData)
    if(res.status!==200){
        throw new Error(res.data.message)

    }
    return res.data
}

export const addHotel = async(hotelFormData: FormData)=>{
    const res = await axiosClient.post('/hotels/add',hotelFormData , {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    
    })
    if(res.status!==200){
        throw new Error(res.data.message)
    }
    return res.data



}
export const logOut = async()=>{
    const res = await axiosClient.get('/users/logout')
    if(res.status!==200){
        throw new Error(res.data.message)
    }
    return res.data
}


export const validateToken = async()=>{
    const res = await axiosClient.get('/users/validate-token')
    if(res.status===400){
        throw new AxiosError("Token Invalid")
    }
    return res.data
    
}

