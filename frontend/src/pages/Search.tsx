import { useState } from 'react'
import { motion } from 'framer-motion'
import HotelSearchCard from '../components/HotelSearchCard'
import { useSearchContext } from '../contexts/SearchContext'
import { useQuery } from '@tanstack/react-query'
import * as apiClient from '../api-client'
import Pagination from '../components/Pagination'


const countries = ['All', 'Maldives', 'Japan', 'Switzerland']
const hotelTypes = ['All', 'Resort', 'City Hotel', 'Lodge']
const facilities = ['wifi', 'pool', 'restaurant', 'parking', 'spa']


interface FilterOptions {
    country: string;
    priceRange: [number, number];
    sortBy: 'price-low-to-high' | 'price-high-to-low' | 'rating-high-to-low' | 'rating-low-to-high';
    rating: number;
    facilities: string[];
    hotelType: string;
  }
  

export default function Search() {
   
  const [filters, setFilters] = useState<FilterOptions>({
    country: 'All',
    priceRange: [0, 1000],
    sortBy: 'price-low-to-high',
    rating: 0,
    facilities: [],
    hotelType: 'All'
  })
  const search= useSearchContext()
  const [page , setPage] = useState<number>(1)
  console.log( search)
  const searchParams = {
    destination: search.destination,
    checkIn : search.checkIn.toISOString(),
    checkOut : search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page : page.toString()

  }
  const {data:searchedHotels} = useQuery(
    {
      queryKey:['searchHotel' , searchParams],
      queryFn:()=> apiClient.searchHotels(searchParams)
    }
  )
  console.log(searchedHotels)
  
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filteredHotels = searchedHotels?.hotels?.filter(hotel => filters.country === 'All' || hotel.country === filters.country)
    .filter(hotel => hotel.pricePerNight >= filters.priceRange[0] && hotel.pricePerNight <= filters.priceRange[1])
    .filter(hotel => hotel.starRating >= filters.rating)
    .filter(hotel => filters.facilities.every(facility => hotel.facilities.includes(facility)))
    .filter(hotel => filters.hotelType === 'All' || hotel.type === filters.hotelType)
    .sort((a, b) => {
      if (filters.sortBy === 'price-low-to-high') return a.pricePerNight - b.pricePerNight
      if (filters.sortBy === 'price-high-to-low') return b.pricePerNight - a.pricePerNight
      return 0
    })

  return (
    <>
    <div className="min-h-screen mt-10 bg-gray-100">
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <motion.aside 
            className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Filters</h2>
                        <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                id="country"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                />
                <span>-</span>
                <input
                  type="number"
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                />
              </div>
            </div>

            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
              <select
                id="sortBy"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
              </select>
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Minimum Star Rating</label>
              <select
                id="rating"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating}>{rating} Stars</option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">Facilities</span>
              <div className="space-y-2">
                {facilities.map(facility => (
                  <label key={facility} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={filters.facilities.includes(facility)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange('facilities', [...filters.facilities, facility])
                        } else {
                          handleFilterChange('facilities', filters.facilities.filter(f => f !== facility))
                        }
                      }}
                    />
                    <span className="text-sm text-gray-700 capitalize">{facility}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="hotelType" className="block text-sm font-medium text-gray-700 mb-1">Hotel Type</label>
              <select
                id="hotelType"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.hotelType}
                onChange={(e) => handleFilterChange('hotelType', e.target.value)}
              >
                {hotelTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </motion.aside>

          <motion.div 
            className="w-full lg:w-3/4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6">{filteredHotels?.length} Search Results</h2>
            <div className="space-y-6">
              {filteredHotels?.map(hotel => (
                <HotelSearchCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          </motion.div>
         
        </div>
      </main>
     
    </div>
     <div className='mt-10'>
     <Pagination page={searchedHotels?.pagination.page || 1} totalPages={searchedHotels?.pagination.totalPages || 1} onPageChange={(page)=>setPage(page)}  />
   </div>
   </>
  )
}