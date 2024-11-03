import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CarTaxiFront, ChevronLeft, ChevronRight, HotelIcon, SpadeIcon, Star, Waves, Wifi } from 'lucide-react'
import { HotelType } from '@prash766/shared-types/dist'
import { useLocation } from 'react-router-dom'

const Hotel: React.FC<HotelType> = ({ name, city, country, description, starRating, facilities, type, imageUrls }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length)
  }

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(nextImage, 5000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, imageUrls.length])

  const facilityIcons = {
    wifi: <Wifi className="w-5 h-5" />,
    pool: <Waves className="w-5 h-5" />,
    restaurant: <HotelIcon className="w-5 h-5" />,
    parking: <CarTaxiFront className="w-5 h-5" />,
    spa: <SpadeIcon className="w-5 h-5" />
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div 
        className="relative w-full h-0 pb-[50%] bg-gray-100" // 16:9 aspect ratio
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageUrls.map((image, index) => (
          <motion.img
            key={image}
            src={image}
            alt={`${name} - Image ${index + 1}`}
            className="absolute inset-0 w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600">{city}, {country}</p>
          </div>
          <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
            <span className="text-blue-800 font-semibold mr-1">{type}</span>
          </div>
        </div>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < starRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-gray-600">{starRating} out of 5</span>
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Facilities</h3>
          <div className="flex flex-wrap gap-2">
            {facilities.map((facility) => (
              <div key={facility} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                {facilityIcons[facility as keyof typeof facilityIcons]}
                <span className="ml-2 text-sm text-gray-700 capitalize">{facility}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  )
}

export default function HotelPage() {
  const location = useLocation()
  const hotel = location.state as HotelType

  return (
    <div className="container mx-auto px-4 py-8">
      <Hotel {...hotel} />
    </div>
  )
}