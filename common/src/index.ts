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
  }

 export type HotelSearchResponse = {
    hotels:HotelType[],
    pagination :{
        total:number,
        page: number,
        totalPages: number
    }

 }