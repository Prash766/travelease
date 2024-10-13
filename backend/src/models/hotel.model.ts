import mongoose, { Schema, StringSchemaDefinition } from "mongoose";
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
}

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
 
    
}, {timestamps:true})


 const Hotel = mongoose.model<HotelType>("hotel" , HotelSchema)
export default Hotel