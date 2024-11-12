import { format } from 'date-fns';
import { MapPin, Calendar, Users, CreditCard } from 'lucide-react';
import { Booking } from '../pages/MyBookings';


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
export default BookingCard