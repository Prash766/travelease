import { Wifi, Tv, Car, Dumbbell, Utensils, Coffee, Wind, Waves, Mountain, PawPrint, Sun, Star, Users, Baby, LucideIcon } from "lucide-react";
import { motion } from 'framer-motion';
import { Hotel } from "../pages/MyHotels";

export const predefinedFacilities = [
  { name: 'Wi-Fi', icon: Wifi, color: "blue" },
  { name: 'TV', icon: Tv, color: "green" },
  { name: 'Parking', icon: Car, color: "yellow" },
  { name: 'Gym', icon: Dumbbell, color: "red" },
  { name: 'Restaurant', icon: Utensils, color: "orange" },
  { name: 'Room Service', icon: Coffee, color: "amber" },
  { name: 'Air Conditioning', icon: Wind, color: "sky" },
  { name: 'Beach Access', icon: Waves, color: "cyan" },
  { name: 'Mountain View', icon: Mountain, color: "indigo" },
  { name: 'Pet-friendly', icon: PawPrint, color: "pink" },
  { name: 'Pool', icon: Sun, color: "purple" },
];

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden rounded-xl shadow-lg"
      whileHover={{
        scale: 1.03,
        transition: {
          duration: 0.2
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={hotel.imageUrls[0]}
        alt={hotel.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      <div className="relative z-10 p-6 flex flex-col h-full justify-end">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{hotel.name}</h2>
            <p className="text-sm text-gray-300">{hotel.city}, {hotel.country}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-white">₹{hotel.pricePerNight}</p>
            <p className="text-sm text-gray-300">per night</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          {[...Array(hotel.starRating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
          {[...Array(5 - hotel.starRating)].map((_, i) => (
            <Star key={i + hotel.starRating} className="h-5 w-5 text-gray-400" />
          ))}
        </div>
        <div className="flex items-center text-gray-300 mb-4">
          <Users className="h-5 w-5 mr-2" />
          <span className="mr-4">{hotel.adultCount} Adults</span>
          <Baby className="h-5 w-5 mr-2" />
          <span>{hotel.childCount} Children</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {predefinedFacilities
            .filter(facility => hotel.facilities.includes(facility.name)) 
            .map((facility, index) => (
                <span key={index} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${facility.color}-200 text-${facility.color}-800`}>
                <facility.icon className="h-4 w-4 mr-1" /> TV
              </span>
              
            ))}
        </div>
        <motion.button
          className="w-full bg-white text-black text-center py-2 rounded-full font-semibold transition-colors hover:bg-gray-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}

export default HotelCard;
