import React from 'react';
import { format, isAfter } from 'date-fns';
import { MapPin, Calendar, Users, CreditCard } from 'lucide-react';
import * as apiClient from '../api-client';

import { BookingType, HotelType } from '@prash766/shared-types/dist';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type Props= {
    booking :BookingType,
    hotel : HotelType
}

const BookingCard = ({ booking, hotel }: Props) => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const isPastBooking = isAfter(new Date(), checkOutDate);
  
    return (
      <div className={`bg-white rounded-lg min-w-full shadow-md p-6 mb-4 ${isPastBooking ? 'opacity-50' : ''}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-700">{`${hotel.city}, ${hotel.country}`}</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isPastBooking ? 'bg-gray-200 text-gray-600' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            {isPastBooking ? 'Not Active' : 'Upcoming'}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Check-in</p>
              <p className="font-medium">
                {isNaN(checkInDate.getTime()) ? 'Invalid Date' : format(checkInDate, 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Check-out</p>
              <p className="font-medium">
                {isNaN(checkOutDate.getTime()) ? 'Invalid Date' : format(checkOutDate, 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-700">{`${booking.adultCount} adults, ${booking.childCount} children`}</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
            <span className="font-semibold text-lg">₹{booking.totalCost}</span>
          </div>
        </div>
      </div>
    );
  };
const HotelCard: React.FC<{ hotel: HotelType }> = ({ hotel }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
    <div className="relative h-64">
      <img src={hotel.imageUrls[0]} alt={hotel.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white">{hotel.name}</h2>
      </div>
    </div>
    <div className="p-6">
      {hotel.bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} hotel={hotel} />
      ))}
    </div>
  </div>
);

const MyBookings: React.FC = () => {
    const { data: myHotels } = useQuery({
        queryKey: ['myHotels'],
        queryFn: apiClient.fetchMyBooking
    });

    if(myHotels?.length===0) return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <svg
          className="h-24 w-24 text-gray-400 mx-auto mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h8M8 11h8M8 15h4"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">No Bookings Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          It looks like you haven't made any bookings yet. Ready to plan your next adventure?
        </p>
        <Link
          to="/search"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Start Exploring
        </Link>
      </div>
    </div>
    )
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Hotel Bookings</h1>
        {myHotels?.map((hotel: HotelType) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
