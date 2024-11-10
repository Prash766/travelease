import { useForm } from "react-hook-form";
import {motion} from 'framer-motion'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../contexts/SearchContext";
import { ArrowRight, IndianRupee, Users, Calendar } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const {isVerified} = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()
  const { watch, register, setValue, handleSubmit, formState: { errors } } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount
    }
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSubmit = (data: GuestInfoFormData) => {
    console.log(data);
    search.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount
    ) 
    navigate(`/hotels/${hotelId}/booking`)
 };

  const signInButtonClick = (data: GuestInfoFormData)=>{
    search.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount
    )
    navigate('/login', {state:{from : location}})
  }

  return (
    <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
      <form onSubmit={isVerified?handleSubmit(onSubmit): handleSubmit(signInButtonClick)} className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Book Your Stay</h3>
          <div className="flex items-center bg-blue-50 rounded-full p-2 sm:p-3">
            <IndianRupee className="w-5 h-5 text-blue-600 mr-1" />
            <span className="text-xl sm:text-2xl font-bold text-blue-600">{pricePerNight}</span>
            <span className="text-sm text-gray-600 ml-1">per night</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in Date</label>
            <div className="relative">
              <DatePicker
                id="checkIn"
                selected={checkIn}
                onChange={(date) => setValue("checkIn", date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                required
                className="w-full p-2 pl-10 rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out Date</label>
            <div className="relative">
              <DatePicker
                id="checkOut"
                selected={checkOut}
                onChange={(date) => setValue("checkOut", date as Date)}
                selectsEnd
                startDate={checkIn}
                endDate={checkOut}
                minDate={checkIn || minDate}
                maxDate={maxDate}
                required
                className="w-full p-2 pl-10 rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="adultCount" className="block text-sm font-medium text-gray-700">Adults</label>
            <div className="relative">
              <input
                type="number"
                id="adultCount"
                min={1}
                max={20}
                className="w-full p-2 pl-10 rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                {...register("adultCount", {
                  required: "This field is required",
                  min: { value: 1, message: "At least 1 adult is required" },
                  max: { value: 20, message: "Maximum 20 adults allowed" }
                })}
              />
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {errors.adultCount && (
              <p className="text-red-500 text-sm mt-1">{errors.adultCount.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="childCount" className="block text-sm font-medium text-gray-700">Children</label>
            <div className="relative">
              <input
                type="number"
                id="childCount"
                min={0}
                max={20}
                className="w-full p-2 pl-10 rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                {...register("childCount", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Minimum 0 children" },
                  max: { value: 20, message: "Maximum 20 children allowed" }
                })}
              />
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {errors.childCount && (
              <p className="text-red-500 text-sm mt-1">{errors.childCount.message}</p>
            )}
          </div>
        </div>

       {
        isVerified? (
            <motion.div 
            whileHover={{scale: 1.02}}
            whileTap={{scale:0.9}}
            transition={{
                duration:0.2
            }}
            className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-300 ease-in-out hover:scale-102 active:scale-98 flex items-center justify-center space-x-2"
              >
                <span>Book Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
        ): (
            <motion.div 
            whileHover={{scale: 1.02}}
            whileTap={{scale:0.9}}
            transition={{
                duration:0.2
            }}
            className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-300 ease-in-out hover:scale-102 active:scale-98 flex items-center justify-center space-x-2"
              >
                <span>Log In</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
        )
       }
      </form>
    </div>
  );
};

export default GuestInfoForm;