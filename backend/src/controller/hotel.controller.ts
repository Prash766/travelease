import { MongooseError } from "mongoose";
import Hotel, { HotelType } from "../models/hotel.model";
import asyncHandler from "../utils/asyncHandler";
import { uploadCloudinary } from "../utils/cloudinary";

const addHotel = asyncHandler(async(req , res)=>{
    try {
        const imageFiles = req.files as Express.Multer.File[]
        const hotelInfo: HotelType = req.body
       const uploadUrls =  imageFiles.map(async (image)=>{
        if(image?.path){

            const res = await uploadCloudinary(image.path)
            console.log(res)
            return res?.secure_url
        }
        })
        const imageUrls = await Promise.all(uploadUrls)
        
        hotelInfo.imageUrls= imageUrls as string[]
        console.log(req.user)
        hotelInfo.userId = req.user
        const hotel = new Hotel(hotelInfo)
        await hotel.save()
    
        return res.json({
            message:"Working"
        })



        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Something went wrong"
        })
        
    }
})

const getHotelsOfUser = asyncHandler(async(req , res)=>{
 try {
       const hotels= await Hotel.find({userId:req.user})
       res.json({
           hotels,
           message:"All the hotels"
       })
 } catch (error:any) {
    console.log(error)
    res.json({
        success:false,
        message:error.message
    })
    
 }

})


export {
    addHotel,
    getHotelsOfUser
}