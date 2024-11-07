import { MongooseError } from "mongoose";
import Hotel, { HotelType } from "../models/hotel.model";
import asyncHandler from "../utils/asyncHandler";
import { uploadCloudinary } from "../utils/cloudinary";
import { constructSearchQuery } from "../utils/helper";
import ApiError from "../utils/ApiError";

const addHotel = asyncHandler(async (req, res) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const hotelInfo: HotelType = req.body;
    const uploadUrls = imageFiles.map(async (image) => {
      if (image?.path) {
        const res = await uploadCloudinary(image.path);
        // console.log(res);
        return res?.secure_url;
      }
    });
    const imageUrls = await Promise.all(uploadUrls);

    hotelInfo.imageUrls = imageUrls as string[];
    // console.log(req.user);
    hotelInfo.userId = req.user;
    const hotel = new Hotel(hotelInfo);
    await hotel.save();

    return res.json({
      message: "Working",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

const getHotelsOfUser = asyncHandler(async (req, res) => {
  try {
    const hotels = await Hotel.find({ userId: req.user });
    res.json({
      hotels,
      message: "All the hotels",
    });
  } catch (error: any) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

const getHotelInfo = asyncHandler(async (req, res) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
        _id:id,
        userId: req.user
    });
    return res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      message: error.message || "Error fetching Hotels",

    });
  }
});

const updateHotelInfo = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id.toString();
    const hotelData: HotelType = req.body;
    const imageFiles = req.files as Express.Multer.File[];
    let uploadFiles: Promise<string>[] = [];

    if (imageFiles) {
      uploadFiles = imageFiles.map(async (file) => {
        const res = await uploadCloudinary(file.path);
        return res?.secure_url as string;
      });
    }

    let uploadedUrls = await Promise.all(uploadFiles);
    uploadedUrls = [...uploadedUrls, ...hotelData.imageUrls];
    hotelData.imageUrls = uploadedUrls;
    hotelData.userId = req.user;

    const updatedHotel = await Hotel.findByIdAndUpdate(id, hotelData, { new: true });

    if (!updatedHotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      hotel: updatedHotel,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});


const searchHotels = asyncHandler(async(req, res)=>{
 try {
  const query= constructSearchQuery(req.query)
  let sortOptions = {}
  switch(req.query.sortOption){
    case "starRating":
      sortOptions={starRating : -1}
      break;

    case "price-high-to-low":
      sortOptions= {pricePerNight: 1}
      break;

case "rating-low-to-high":
    sortOptions = { starRating: 1 };
    break;

    
  }
   const pageNo = req.query.page?.toString() || "1"
   const pageSize = 10
   const skip = (parseInt(pageNo) - 1)*pageSize
   const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize)
   const total = await Hotel.countDocuments(query)

   return res.status(200).json({
     success:true,
     hotels: hotels,
     pagination:{
      total,  
      page:pageNo,
      totalPages: Math.ceil(total/pageSize)
      
     }
 
   })
 } catch (error: any) {
  console.log(error)
  return res.status(400).json({
    success:false,
    message : error.message || "Something went wrong"
  })

 }

})


const getHotelById = asyncHandler(async(req, res)=>{
  const hotelId = req.params.hotelId.toString()

try {
  const hotel= await Hotel.findById(hotelId)
  if(!hotel){
    throw new ApiError("Invalid Hotel Id", 400)
  }

  return res.status(200).json({
    success: true,
    hotel
  })
} catch (error : any) {
  console.log(error)
  throw new ApiError(`${error.message || "Invalid Id"}` , 400)
}

})



export { addHotel, getHotelsOfUser, getHotelInfo, updateHotelInfo, searchHotels , getHotelById };
