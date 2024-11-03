
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CarTaxiFront, ChevronLeft, ChevronRight, HotelIcon, SpadeIcon, Star, Waves, Wifi } from 'lucide-react'

interface HotelProps {
  name: string
  location: string
  type: string
  rating: number
  description: string
  facilities: string[]
  images: string[]
}

const Hotel: React.FC<HotelProps> = ({ name, location, type, rating, description, facilities, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
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
  }, [isHovered, images.length])

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
        className="relative h-64 sm:h-80 md:h-96"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((image, index) => (
          <motion.img
            key={image}
            src={image}
            alt={`${name} - Image ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
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
            <p className="text-gray-600">{location}</p>
          </div>
          <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
            <span className="text-blue-800 font-semibold mr-1">{type}</span>
          </div>
        </div>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-gray-600">{rating} out of 5</span>
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
  const hotelData: HotelProps = {
    name: "Seaside Paradise Resort",
    location: "Maldives",
    type: "Luxury Resort",
    rating: 4.8,
    description: "Experience ultimate relaxation in our beachfront paradise. Enjoy crystal-clear waters, white sandy beaches, and world-class amenities.",
    facilities: ["wifi", "pool", "restaurant", "spa", "parking"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Hotel {...hotelData} />
    </div>
  )
}