import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
const SearchBar = ({bgTransparent }: {bgTransparent:Boolean}) => {
  const [isSticky, setIsSticky] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const minDate = new Date().toISOString().substring(0, 10);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().substring(0, 10);
  useEffect(() => {
    const handleScroll = () => {
      if (searchRef.current) {
        const { top } = searchRef.current.getBoundingClientRect();
        setIsSticky(top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    alert("Search submitted! Check console for details.");
  };

  // const toggleHomePage = () => {
  //   setIsHomePage(!isHomePage)
  // }
  return (
    <motion.div
      ref={searchRef}
      className={`w-full ${bgTransparent?"":"mt-24"} z-10 ${isSticky ? "sticky top-0 z-50" : ""}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex-grow min-w-[200px]">
            <label
              htmlFor="destination"
              className="block text-sm font-medium mb-1"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              placeholder="Where are you going?"
            />
          </div>
          <div className="flex-grow min-w-[200px]">
            <label htmlFor="checkIn" className="block text-sm font-medium mb-1">
              Check-in
            </label>
            <input
              type="date"
              name="checkIn"
              min={minDate} 
              max={maxDateString} 
              value={checkIn ? checkIn.toISOString().substring(0, 10) : ""} 
              onChange={(e) => setCheckIn(new Date(e.target.value))} 
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="flex-grow min-w-[200px]">
            <label
              htmlFor="checkOut"
              className="block text-sm font-medium mb-1"
            >
              Check-out
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              min={minDate} 
              max={maxDateString} 
              value={checkOut ? checkOut.toISOString().substring(0, 10) : ""} 
              onChange={(e) => setCheckOut(new Date(e.target.value))} 
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="flex-grow min-w-[100px]">
            <label
              htmlFor="adultCount"
              className="block text-sm font-medium mb-1"
            >
              Adults
            </label>
            <input
              type="number"
              id="adultCount"
              name="adultCount"
              value={adultCount}
              onChange={(e) => setAdultCount(Number(e.target.value))}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="flex-grow min-w-[100px]">
            <label
              htmlFor="childCount"
              className="block text-sm font-medium mb-1"
            >
              Children
            </label>
            <input
              type="number"
              id="childCount"
              name="childCount"
              value={childCount}
              onChange={(e) => setChildCount(Number(e.target.value))}
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="flex-grow min-w-[100px]">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors mt-6"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SearchBar;
