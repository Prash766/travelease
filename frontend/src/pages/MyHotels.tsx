import { useQuery } from "@tanstack/react-query"
import {motion} from 'framer-motion'
import HotelCard from "../components/HotelCard"
import * as apiClient from '../api-client'
import MyHotelsSkeleton from "../components/MyHotelsSkeleton"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import ErrorBoundary from "../components/ErrorBoundary"
export type Hotel = {
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


export default function HotelList() {
  const navigate = useNavigate()
  const {data:fetchedHotels , isLoading , isError} = useQuery({
    queryKey:['fetchMyHotels'],
    queryFn: apiClient.fetchMyHotels
  })

  if(isLoading) return <MyHotelsSkeleton/>
  if(isError) return <ErrorBoundary/>



  return (
    <div className="min-h-screen mt-4  py-12">
      <div className="container mx-auto  px-4 xl:px-0">
        <div className="flex justify-between  ">

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 text-blue-600">
          Discover Our Hotels
        </h1>
        <motion.button
        onClick={()=>navigate('/add-hotel')}
            className="bg-green-500 text-white mt-2 px-4 py-1 h-12 rounded-full flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Hotel
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {fetchedHotels?.map((hotel : Hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  )
}