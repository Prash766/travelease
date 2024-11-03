import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import HotelSearchCard from "../components/HotelSearchCard";
import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import Pagination from "../components/Pagination";
import SearchPageSkeleton from "../components/SearchPageSkeleton";
import SearchBar from "../components/SearchBar";

const countries = ["All", "Maldives", "Japan", "Switzerland"];
const hotelTypes = ["All", "Resort", "City Hotel", "Lodge"];
const facilities = ["wifi", "pool", "restaurant", "parking", "spa"];

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export default function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  // Separate states for each filter
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>("price-low-to-high");
  const [rating, setRating] = useState<number>(0);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState<
    [number, number]
  >([0, 1000]);

  const [selectedHotelType, setSelectedHotelType] = useState<string>("All");

  const searchParams: SearchParams = useMemo(
    () => ({
      destination: search.destination,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      adultCount: search.adultCount.toString(),
      childCount: search.childCount.toString(),
      page: page.toString(),
      facilities: selectedFacilities,
      types: selectedHotelType !== "All" ? [selectedHotelType] : [],
      stars: rating > 0 ? [rating.toString()] : [],
      maxPrice: debouncedPriceRange[1].toString(),
      minPrice: debouncedPriceRange[0].toString(),
      sortOption: sortBy,
    }),
    [
      search,
      page,
      selectedFacilities,
      selectedHotelType,
      rating,
      priceRange,
      sortBy,
    ]
  );

  const { data: searchedHotels, isLoading } = useQuery({
    queryKey: ["searchHotel", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });
  useEffect(() => {
    const handler = setTimeout(() => {
      setPriceRange(debouncedPriceRange);
    }, 1000);

    return () => clearTimeout(handler);
  }, [debouncedPriceRange]);
  const handlePriceChange = (index: number, value: string) => {
    const newPrice = parseInt(value, 10);
    setDebouncedPriceRange((prev) =>
      index === 0 ? [newPrice, prev[1]] : [prev[0], newPrice]
    );
  };

  const handleFacilityChange = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  useEffect(() => {
    const id = setTimeout(() => {}, 1000);

    return () => clearTimeout(id);
  }, [priceRange]);
  return (
    <>
    <SearchBar bgTransparent={false}/>
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
              {/* Country Filter */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <select
                  id="country"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                    value={debouncedPriceRange[0]}
                    onChange={(e) => handlePriceChange(0, e.target.value)}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                    value={debouncedPriceRange[1]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                  />
                </div>
              </div>

              {/* Sort By Filter */}
              <div>
                <label
                  htmlFor="sortBy"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort by
                </label>
                <select
                  id="sortBy"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Minimum Star Rating
                </label>
                <select
                  id="rating"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} Stars
                    </option>
                  ))}
                </select>
              </div>

              {/* Facilities Filter */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Facilities
                </span>
                <div className="space-y-2">
                  {facilities.map((facility) => (
                    <label
                      key={facility}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedFacilities.includes(facility)}
                        onChange={() => handleFacilityChange(facility)}
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {facility}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hotel Type Filter */}
              <div>
                <label
                  htmlFor="hotelType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Hotel Type
                </label>
                <select
                  id="hotelType"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={selectedHotelType}
                  onChange={(e) => setSelectedHotelType(e.target.value)}
                >
                  {hotelTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </motion.aside>

            {isLoading ? (
              <SearchPageSkeleton />
            ) : (
              <motion.div
                className="w-full lg:w-3/4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-6">
                  {searchedHotels?.hotels?.length || 0} Search Results
                </h2>
                <div className="space-y-6">
                  {searchedHotels?.hotels?.map((hotel) => (
                    <HotelSearchCard key={hotel._id} hotel={hotel} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
      <div className="mt-10">
        <Pagination
          page={searchedHotels?.pagination?.page || 1}
          totalPages={searchedHotels?.pagination?.totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
