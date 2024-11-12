import React from 'react';
import { format, isAfter } from 'date-fns';
import { MapPin, Calendar, Users, CreditCard } from 'lucide-react';
import * as apiClient from '../api-client';

import { BookingType, HotelType } from '@prash766/shared-types/dist';
import { useQuery } from '@tanstack/react-query';

type Props= {
    booking :BookingType,
    hotel : HotelType
}

const BookingCard = ({ booking, hotel }: Props) => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const isPastBooking = isAfter(new Date(), checkOutDate);
  
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 mb-4 ${isPastBooking ? 'opacity-50' : ''}`}>
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
            <span className="font-semibold text-lg">${booking.totalCost}</span>
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
