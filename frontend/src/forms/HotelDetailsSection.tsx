'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, Tv, Car, Dumbbell, Utensils, Coffee, Wind, Waves, Mountain, PawPrint, Sun, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

type HotelFormType = {
  name: string
  city: string
  country: string
  description: string
  type: string
  pricePerNight: number
  starRating: number
  facilities: string[]
  adultCount: number
  childCount: number
  imageUrls: FileList | null
}

const hotelTypes = ['Resort', 'Hotel', 'Apartment', 'Villa', 'Hostel']

const predefinedFacilities = [
  { name: 'Wi-Fi', icon: Wifi },
  { name: 'TV', icon: Tv },
  { name: 'Parking', icon: Car },
  { name: 'Gym', icon: Dumbbell },
  { name: 'Restaurant', icon: Utensils },
  { name: 'Room Service', icon: Coffee },
  { name: 'Air Conditioning', icon: Wind },
  { name: 'Beach Access', icon: Waves },
  { name: 'Mountain View', icon: Mountain },
  { name: 'Pet-friendly', icon: PawPrint },
  { name: 'Pool', icon: Sun },
]

export default function HotelDetailsSection() {
    const {register} = useFormContext<HotelFormType>()
  const [formData, setFormData] = useState<HotelFormType>({
    name: 'Sunset Beach Resort',
    city: 'Malibu',
    country: 'United States',
    description: 'Experience luxury and relaxation at our beachfront resort. Enjoy stunning ocean views, world-class amenities, and impeccable service.',
    type: 'Resort',
    pricePerNight: 350,
    starRating: 5,
    facilities: ['Wi-Fi', 'TV', 'Pool'],
    adultCount: 2,
    childCount: 1,
    imageUrls: null
  })

  const [images, setImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

 
  const handleFacilityToggle = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFormData(prev => ({ ...prev, imageUrls: files }))
      setImages(Array.from(files).map(file => URL.createObjectURL(file)))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="mt-20  min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold text-center">Hotel Registration</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-8 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-lg font-semibold block">Hotel Name</label>
              <input
                type="text"
                id="name"
                required
                {...register("name", {required:"Enter the Name"})}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="text-lg font-semibold block">Hotel Type</label>
              <select
                id="type"
                required
                {...register("type", {required:"Enter the Name"})}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              >
                {hotelTypes.map(type => (
                  <option 
                  key={type}
                
                  value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="text-lg font-semibold block">Country</label>
              <input
                type="text"
                id="country"
                {...register("country", {required:"Enter the Country"})}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-lg font-semibold block">City</label>
              <input
                type="text"
                id="city"
                value={formData.city}
                {...register("city" ,{required:"Enter the City"})}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="adultCount" className="text-lg font-semibold block">Max Adults</label>
              <input
                type="number"
                id="adultCount"
                value={formData.adultCount}
                required
                min="1"
                {...register("adultCount" ,{required:"Enter the City"})}

                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="childCount" className="text-lg font-semibold block">Max Children</label>
              <input
                type="number"
                id="childCount"
                value={formData.childCount}
                required
                min="0"
                {...register("childCount" ,{required:"Enter the Child Count"})}

                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="description" className="text-lg font-semibold block">Description</label>
              <textarea
                id="description"
                value={formData.description}
                {...register("city" ,{required:"Enter the Hotel Description"})}

                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors min-h-[150px]"
              ></textarea>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="pricePerNight" className="text-lg font-semibold block">Price per Night ($)</label>
                <input
                  type="range"
                  id="pricePerNight"
                  min="0"
                  max="1000"
                  step="10"
                  value={formData.pricePerNight}
                  {...register("pricePerNight", {required:""})}
                  className="w-full"
                />
                <div className="text-center font-semibold text-lg">${formData.pricePerNight}</div>
              </div>
              <div className="space-y-2">
                <label htmlFor="starRating" className="text-lg font-semibold block">Star Rating</label>
                <div className="flex justify-between items-center text-4xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFormData(prev => ({ ...prev, starRating: star }))}
                      className={`cursor-pointer ${formData.starRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star fill={`${formData.starRating >= star ? '#FFFF00' : '#808080'}`} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-lg font-semibold block">Facilities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {predefinedFacilities.map((facility) => (
                <motion.button
                  key={facility.name}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFacilityToggle(facility.name)}
                  className={`p-4 rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
                    formData.facilities.includes(facility.name)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <facility.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{facility.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="imageUrls" className="text-lg font-semibold block">Images</label>
            <input
              type="file"
              id="imageUrls"
              name="imageUrls"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
              required
              className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
            />
          </div>

          <AnimatePresence>
            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative w-full h-80 bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={images[currentImageIndex]}
                  alt={`Preview ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors p-2 rounded-full"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors p-2 rounded-full"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
          >
            Register Hotel
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}