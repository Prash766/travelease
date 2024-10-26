import { motion, AnimatePresence } from 'framer-motion'
import { CarTaxiFront, ChefHat, ChevronLeft, ChevronRight, GlassWater, ShoppingBag, Star, Wifi } from 'lucide-react'
import { useState } from 'react'

function HotelSearchCard({ hotel }: { hotel: any }) {
  const [[currentImageIndex, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    const nextIndex = (currentImageIndex + newDirection + hotel.images.length) % hotel.images.length
    setPage([nextIndex, newDirection])
  }

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      scale: 0.8,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      scale: 0.8,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden mb-6 hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:flex">
        <div className="md:w-1/3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/20 z-10" />
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentImageIndex}
              src={hotel.images[currentImageIndex]}
              alt={hotel.name}
              className="w-full h-full object-cover absolute top-0 left-0"
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_,{ offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
            />
          </AnimatePresence>
          
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors"
              style={{ transformOrigin: 'center' }}
            >
              <ChevronLeft size={20} />
            </motion.button>
          </div>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors"
              style={{ transformOrigin: 'center' }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
            {hotel.images.map((_ : any, index: number) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                initial={false}
                animate={{ scale: index === currentImageIndex ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-2">
            <motion.h3 
              className="text-xl font-semibold"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {hotel.name}
            </motion.h3>
            <div className="flex items-center">
              {[...Array(hotel.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star size={16} className="text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </div>
          </div>
          <p className="text-gray-600 mb-2">{hotel.country}</p>
          <p className="text-lg font-bold mb-2">${hotel.price} per night</p>
          <p className="text-gray-700 mb-4">{hotel.description}</p>
          <div className="flex flex-wrap gap-3 mb-4">
            {hotel.facilities.map((facility: string, index: number) => (
              <motion.div
                key={facility}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-100 p-2 rounded-full"
              >
                {facility === 'wifi' && <Wifi size={20} />}
                {facility === 'pool' && <GlassWater size={20} />}
                {facility === 'restaurant' && <ChefHat size={20} />}
                {facility === 'parking' && <CarTaxiFront size={20} />}
                {facility === 'spa' && <ShoppingBag size={20} />}
              </motion.div>
            ))}
          </div>
          <motion.button 
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default HotelSearchCard