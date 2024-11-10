export type HotelType = {
    _id: string
    userId: string
    name: string
    city: string
    country: string
    description: string
    starRating: number
    adultCount: number
    childCount: number
    facilities: string[]
    type: string
    pricePerNight: number
    imageUrls: string[]
    createdAt: string
    updatedAt: string
    bookings : BookingType[]
  }

 export type HotelSearchResponse = {
    hotels:HotelType[],
    pagination :{
        total:number,
        page: number,
        totalPages: number
    }

 }
 export type UserType={
    _id:string,
    email:string,
    password:string,
    firstName:string,
    lastName:string,
 }

 export type BookingType ={
   _id:string,
   userId:string,
   firstName : string,
   lastName: string,
   email: string,
   adultCount: number,
   childCount : number
   checkIn : Date
   checkOut :Date
   totalCost: number

 }

 export type paymentIntentResposne ={
   paymentIntentId:string,
   clientSecret :string,
   totalPrice: number
 }