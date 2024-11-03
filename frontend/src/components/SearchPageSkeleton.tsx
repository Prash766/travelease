import { motion } from "framer-motion";

export default function SearchPageSkeleton() {
  return (
    <div className="p-4">
      <div className="text-2xl font-bold mb-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md" />
      </div>

      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative w-full md:w-[250px] lg:w-[400px] md:h-[300px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-2">
                {/* Title */}
                <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md" />
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 bg-gray-200 animate-pulse rounded-md"
                    />
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-md mb-4" />

              {/* Price */}
              <div className="h-4 w-36 bg-gray-200 animate-pulse rounded-md mb-4" />

              {/* Description */}
              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md" />
                <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-md" />
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-32 bg-gray-200 animate-pulse rounded-full"
                  />
                ))}
              </div>

              {/* Book Now Button */}
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-full" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
