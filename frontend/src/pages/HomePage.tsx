'use client'

import  { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {  Star, TrendingUp, Shield, Globe, CreditCard } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import * as apiClient from '../api-client'
import PopularDestinationsSkeleton from '../skeletons/PopularDestinationsSkeleton'
import { useNavigate } from 'react-router-dom'

const carouselItems = [
  {
    type: 'hotel',
    name: "Luxury Resort & Spa",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    price: "$500/night"
  },
  {
    type: 'destination',
    name: "Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    description: "Experience the magic of white-washed buildings and breathtaking sunsets."
  },
  {
    type: 'destination',
    name: "KedarNath Yatra",
    location: "Uttrakhand",
    description: "Embark on a spiritual journey to the sacred Kedarnath Temple, located amidst the breathtaking landscapes of the Garhwal Himalayas.",
    image: "https://imgs.search.brave.com/QtZlS8YYJRll2llpm8aJ_Wl8anewGb79U4-ilKsHJSk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQva2VkYXJuYXRo/LTRrLTlwZDZjODRm/amxkeWVuamcuanBn",
 
  },
  {
    type: 'destination',
    name: "Leh Ladakh",
    location: "Ladakh",
    image: "https://as2.ftcdn.net/v2/jpg/00/86/93/13/1000_F_86931350_yys0clXOBmAZLq2cKQwoy0cG9aS3qCDf.jpg",
    description: "Explore the mesmerizing landscapes of Leh-Ladakh, a region known for its rugged beauty and tranquil charm"
  },
  {
    type: 'hotel',
    name: "Hotel Apollo ",
    location: "Himachal Pradesh",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/46/47/66/getlstd-property-photo.jpg?w=1200&h=-1&s=1",
    rating:  4.8,
    price : "₹4500/night"

  }
]



const features = [
  { icon: TrendingUp, title: "Exclusive Deals", description: "Access to special rates and limited-time offers" },
  { icon: Shield, title: "Secure Booking", description: "Your personal and payment information is always protected with Stripe" },
  { icon: Globe, title: "24/7 Support", description: "Round-the-clock assistance for all your travel needs" },
  { icon: CreditCard, title: "Flexible Payments", description: "Easy and secure payments with Stripe integration" },
]
function HomePage() {

  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
  }

  const {data:fetchedHotels , isLoading} = useQuery({
    queryKey:['fetchedHighestRatedHotels'],
    queryFn:apiClient.allHotels
  })


  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])
  

  return (
    <main className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Dynamic Carousel Section */}
        <section className="mb-24 -mx-4 lg:-mx-8 ">
          <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-2xl" style={{ height: '600px' }}>
            <AnimatePresence initial={false} custom={currentIndex}>
              <motion.div
                key={currentIndex}
                custom={currentIndex}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0,
                  }),
                  center: {
                    zIndex: 1,
                    x: 0,
                    opacity: 1,
                  },
                  exit: (direction: number) => ({
                    zIndex: 0,
                    x: direction < 0 ? 1000 : -1000,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full h-full"
              >
                <img
                  src={carouselItems[currentIndex].image}
                  className="w-full h-full object-cover"

                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold mb-2"
                  >
                    {carouselItems[currentIndex].name}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl mb-4"
                  >
                    {carouselItems[currentIndex].location}
                  </motion.p>
                  {carouselItems[currentIndex].type === 'hotel' && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                        <span>{carouselItems[currentIndex].rating}</span>
                      </div>
                      <span>{carouselItems[currentIndex].price}</span>
                    </motion.div>
                  )}
                  {carouselItems[currentIndex].type === 'destination' && (
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg"
                    >
                      {carouselItems[currentIndex].description}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Popular Destinations Section */}
         
           <section className="mb-24">
           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Destinations</h2>
           {isLoading ? <PopularDestinationsSkeleton/> : (
            <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer">
            {fetchedHotels?.map((hotel, index) => (
              <motion.div
              onClick={()=>navigate(`hotels/${hotel._id}`)}
                key={hotel.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48">
                  <img
                    src={hotel.imageUrls[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{hotel.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{hotel.starRating} (2,345 reviews)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
           )}
           
         </section>
      

        {/* Featured Experiences Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Culinary Tour in Rome", image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80", price: "$129" },
              { title: "Scuba Diving in Great Barrier Reef", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80", price: "$299" },
              { title: "Northern Lights Expedition", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80", price: "$499" },
            ].map((experience, index) => (
              <motion.div
                key={experience.title}
                className="relative group overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={experience.image}
                  alt={experience.title}
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
                  <p className="text-sm">Starting from {experience.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose TravelVerse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Travel Tips Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Travel Tips & Inspiration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "10 Must-Visit Hidden Gems in Europe", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80" },
              { title: "How to Pack Like a Pro: Essential Travel Hacks", image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=800&q=80" },
              { title: "Sustainable Travel: Eco-Friendly Vacation Ideas", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" },
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={tip.image}
                  alt={tip.title}
                  width={800}
                  height={500}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <button  className="mt-2">Read More</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
       
      </div>
    </main>
  )
}
export default HomePage