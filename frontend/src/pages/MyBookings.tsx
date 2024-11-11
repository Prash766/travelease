import React from 'react';
import { format } from 'date-fns';
import { MapPin, Calendar, Users, CreditCard } from 'lucide-react';

interface Booking {
  id: string;
  hotelName: string;
  location: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  totalPrice: number;
  isPaid: boolean;
  isCancelled: boolean;
}

interface Hotel {
  name: string;
  image: string;
  bookings: Booking[];
}

const mockHotels: Hotel[] = [
  {
    name: "Grand Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    bookings: [
      {
        id: "1",
        hotelName: "Grand Hotel",
        location: "Paris, France",
        checkIn: new Date("2024-06-15"),
        checkOut: new Date("2024-06-20"),
        adults: 2,
        children: 0,
        totalPrice: 1500,
        isPaid: true,
        isCancelled: false
      },
      {
        id: "2",
        hotelName: "Grand Hotel",
        location: "Paris, France",
        checkIn: new Date("2024-08-01"),
        checkOut: new Date("2024-08-05"),
        adults: 2,
        children: 1,
        totalPrice: 1200,
        isPaid: false,
        isCancelled: false
      }
    ]
  },
  {
    name: "Seaside Resort",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    bookings: [
      {
        id: "3",
        hotelName: "Seaside Resort",
        location: "Bali, Indonesia",
        checkIn: new Date("2024-07-10"),
        checkOut: new Date("2024-07-17"),
        adults: 2,
        children: 0,
        totalPrice: 2100,
        isPaid: true,
        isCancelled: false
      }
    ]
  },
  {
    name: "Mountain Lodge",
    image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    bookings: [
      {
        id: "4",
        hotelName: "Mountain Lodge",
        location: "Aspen, Colorado",
        checkIn: new Date("2024-12-20"),
        checkOut: new Date("2024-12-27"),
        adults: 2,
        children: 2,
        totalPrice: 3500,
        isPaid: true,
        isCancelled: true
      }
    ]
  }
];

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 mb-4 ${booking.isCancelled ? 'opacity-50' : ''}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-gray-500" />
        <span className="text-gray-700">{booking.location}</span>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
        booking.isCancelled ? 'bg-red-100 text-red-800' : 
        (booking.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')
      }`}>
        {booking.isCancelled ? 'Cancelled' : (booking.isPaid ? 'Paid' : 'Pending Payment')}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
        <div>
          <p className="text-sm text-gray-600">Check-in</p>
          <p className="font-medium">{format(booking.checkIn, 'MMM dd, yyyy')}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
        <div>
          <p className="text-sm text-gray-600">Check-out</p>
          <p className="font-medium">{format(booking.checkOut, 'MMM dd, yyyy')}</p>
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Users className="w-5 h-5 mr-2 text-gray-500" />
        <span className="text-gray-700">{booking.adults} adults, {booking.children} children</span>
      </div>
      <div className="flex items-center">
        <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
        <span className="font-semibold text-lg">${booking.totalPrice}</span>
      </div>
    </div>
  </div>
);

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
    <div className="relative h-64">
      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white">{hotel.name}</h2>
      </div>
    </div>
    <div className="p-6">
      {hotel.bookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  </div>
);

const MyBookings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Hotel Bookings</h1>
        {mockHotels.map(hotel => (
          <HotelCard key={hotel.name} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;