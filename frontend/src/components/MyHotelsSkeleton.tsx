
import { motion } from 'framer-motion'

function SkeletonCard() {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl shadow-lg bg-gray-100 h-[400px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gray-200"></div>
      <div className="relative z-10 p-6 flex flex-col h-full justify-end">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-gray-400 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-400 rounded animate-pulse"></div>
          </div>
          <div className="text-right space-y-2">
            <div className="h-6 w-24 bg-gray-400 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-400 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center mb-4 space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-5 w-5 bg-gray-400 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="h-4 w-full bg-gray-400 rounded animate-pulse mb-4"></div>
        <div className="h-4 w-3/4 bg-gray-400 rounded animate-pulse mb-4"></div>
        <div className="flex items-center mb-4 space-x-4">
          <div className="h-5 w-24 bg-gray-400 rounded animate-pulse"></div>
          <div className="h-5 w-24 bg-gray-400 rounded animate-pulse"></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 w-20 bg-gray-400 rounded-full animate-pulse"></div>
          ))}
        </div>
        <div className="w-full h-10 bg-gray-400 rounded-full animate-pulse"></div>
      </div>
    </motion.div>
  )
}

export default function MyHotelsSkeleton() {
  return (
    <div className="min-h-screen  py-12">
      <div className="container mx-auto px-4 xl:px-0">
        <div className="h-12 mt-6 w-3/4 mx-auto bg-gray-300 rounded animate-pulse mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}