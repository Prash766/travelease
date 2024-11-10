import mongoose, { Schema } from "mongoose";
import {BookingType} from '@prash766/shared-types/dist'
export type HotelType = {
    _id:string,
    userId:string,
    name:string,
    city :string,
    country:string,
    description:string,
    starRating:number,
    adultCount:number,
    childCount:number,
    facilities:string[],
    type:string,
    pricePerNight:number,
    imageUrls:string[],
    bookings: BookingType
}
const BookingSchema = new Schema<BookingType>({
    firstName :{
        type:String,
        required:true
    },
    lastName :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    adultCount :{
        type:Number,
        required:true
    },
    childCount :{
        type:Number,
        required:true
    },
    checkIn:{
        type:Date,
        required: true
    },
    checkOut:{
        type:Date,
        required: true
    },
    userId:{
        type: String,
        required:true,
    },
    totalCost:{
        type: Number,
        required:true
    }
})

const HotelSchema= new Schema<HotelType>({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,

    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required :true
    },
    starRating:{
        type :Number,
        required:true,
        min:1,
        max:5
    },
    adultCount:{
        type:Number,
        required:true
    },
    childCount:{
        type:Number,
        required:true
    },
    facilities:[
        {
            type:String,
            required:true
        }
    ],
    type:{
        type:String,
        required:true
    },
    pricePerNight:{
        type:Number,
        required:true
    },
    imageUrls:[
        {
            type:String,
            required:true
        }
    ],
    bookings: [BookingSchema]
}, {timestamps:true})


 const Hotel = mongoose.model<HotelType>("hotel" , HotelSchema)
export default Hotel