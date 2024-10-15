"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import StarRatings from "./StarRatings";
import FacilityType from "./FacilityType";

type HotelFormType = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  adultCount: number;
  childCount: number;
  imageUrls: FileList | null;
};

export type HotelOtherType = {
  starRating: number
  facilities: string[]
  pricePerNight:string
};

const hotelTypes = ["Resort", "Hotel", "Apartment", "Villa", "Hostel"];

export default function HotelDetailsSection() {
  const { register } = useFormContext<HotelFormType>();
  const [formData, setFormData] = useState<HotelOtherType>({
    starRating: 0,
    facilities: [""],
    pricePerNight: "0"
    
  });

  const handleStars = (star: number) => {
    setFormData((prev: HotelOtherType) => ({
      ...prev,
      starRating: star,
    }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  const handleFacilityToggle = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

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
              <label htmlFor="name" className="text-lg font-semibold block">
                Hotel Name
              </label>
              <input
                type="text"
                id="name"
                required
                {...register("name", { required: "Enter the Name" })}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="text-lg font-semibold block">
                Hotel Type
              </label>
              <select
                id="type"
                required
                {...register("type", { required: "Enter the Name" })}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              >
                {hotelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="text-lg font-semibold block">
                Country
              </label>
              <input
                type="text"
                id="country"
                {...register("country", { required: "Enter the Country" })}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-lg font-semibold block">
                City
              </label>
              <input
                type="text"
                id="city"
                {...register("city", { required: "Enter the City" })}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="adultCount"
                className="text-lg font-semibold block"
              >
                Max Adults
              </label>
              <input
                type="number"
                id="adultCount"
                required
                min="1"
                {...register("adultCount", { required: "Enter the City" })}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="childCount"
                className="text-lg font-semibold block"
              >
                Max Children
              </label>
              <input
                type="number"
                id="childCount"
                required
                min="0"
                {...register("childCount", {
                  required: "Enter the Child Count",
                })}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-lg font-semibold block"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("city", {
                  required: "Enter the Hotel Description",
                })}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors min-h-[150px]"
              ></textarea>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="pricePerNight"
                  className="text-lg font-semibold block"
                >
                  Price per Night ₹{formData.pricePerNight}
                </label>
                <input
                  type="range"
                  id="pricePerNight"
                  name="pricePerNight"
                  min="0"
                  max="100000"
                  step="500"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <div className="text-center font-semibold text-lg"></div>
              </div>
              <StarRatings handleStar={handleStars} formData={formData} />
            </div>
          </div>
          <FacilityType
            handleFacilityToggle={handleFacilityToggle}
            formData={formData}
          />

          <div className="space-y-2">
            <label htmlFor="imageUrls" className="text-lg font-semibold block">
              Images
            </label>
            <input
              type="file"
              id="imageUrls"
              multiple
              accept="image/*"
              {...register("imageUrls", {
                required: "Select Images for Your Hotels",
              })}
              className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 transition-colors"
            />
          </div>

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
  );
}
