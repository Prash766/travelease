
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { MapPin, Calendar, Users, Mail, User, Hotel, Loader } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as apiClient from '../api-client';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';
import { paymentIntentResposne, UserType } from '@prash766/shared-types/dist';

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number
  childCount: number
  checkIn: string
  checkOut:string
  hotelId: string
  totalCost: number
  paymentIntentId : string
};

type BookingDetails= {
    hotelName: string | undefined;
    location: string;
    checkIn: Date;
    checkOut: Date;
    adults: number;
    children: number;
    pricePerNight: number;
  }
  

type Props= {
    bookingDetails :BookingDetails
    currentUser: UserType | undefined
    totalNights:number
    paymentIntentData:paymentIntentResposne |undefined
}

const BookingForm = ({ 
  currentUser, 
  paymentIntentData 
}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState<string>("");
const {showToast} = useAppContext()
const search = useSearchContext()
const {hotelId} = useParams()

const {mutate: bookRoom ,isPending} = useMutation({
    mutationKey:['bookHotelRoom'],
        mutationFn: (formData: BookingFormData) => apiClient.createBooking(formData),

     onSuccess: ()=>{
        showToast({message:"Booking Successfull", type:'SUCCESS'})

     },
     onError:(error)=>{
        console.log(error)
        showToast({message:"Booking Failed" , type:"ERROR"})
     }
})


  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>();

  useEffect(() => {
    if (currentUser) {
      reset({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        adultCount: search.adultCount,
        childCount : search.childCount,
        checkIn: search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        hotelId:hotelId,
        totalCost: paymentIntentData?.totalPrice,
        paymentIntentId : paymentIntentData?.paymentIntentId
      });
    }
  }, [currentUser, reset]);

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    try {
      setPaymentError("");

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const result = await stripe.confirmCardPayment(paymentIntentData?.clientSecret as string, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
          }
        }
      });
      if(result.paymentIntent?.status === "succeeded"){
        //book the room
        console.log(formData)
        bookRoom({...formData ,totalCost:paymentIntentData?.totalPrice as number,paymentIntentId : result.paymentIntent.id})
      }

      if (result.error) {
        throw new Error(result.error.message);
      }
      console.log("Payment successful!");

    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Payment failed");
    } 
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="firstName"
                {...register('firstName', { required: 'First name is required' })}
                className="pl-10 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John"
              />
            </div>
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="lastName"
                {...register('lastName', { required: 'Last name is required' })}
                className="pl-10 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Doe"
              />
            </div>
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
              className="pl-10 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="john.doe@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
              <div className="p-3 border rounded-md shadow-sm">
                <CardElement options={cardElementOptions} />
              </div>
              {paymentError && (
                <p className="mt-1 text-sm text-red-600">{paymentError}</p>
              )}
            </div>
          </div>
        </div>
        <button
  type="submit"
  disabled={isPending || !stripe}
  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${isPending ? 'opacity-75 cursor-not-allowed' : ''}`}
>
  {isPending && (
    <div className="flex justify-center items-center mr-2">
      <Loader className="animate-spin" color="#FFFFFF" />
    </div>
  )}
  {isPending ? 'Processing...' : 'Confirm Booking'}
</button>

      </form>
    </div>
  );
};

// main component that handles data fetching and layout
const BookingPage: React.FC = () => {
  const { stripePromise } = useAppContext();
  const { hotelId } = useParams();
  const search = useSearchContext();

  const { data: currentUser } = useQuery({
    queryKey: ['fetchCurrentUser'],
    queryFn: apiClient.fetchUserDetails
  });

  const { data: hotelInfo } = useQuery({
    queryKey: ['hotelDetails'],
    queryFn: () => apiClient.fetchHotelById(hotelId as string)
  });

  const { data: paymentIntentData } = useQuery({
    queryKey: ['createPaymentIntent'],
    queryFn: () => apiClient.createPaymentIntent(hotelId as string, totalNights.toString())
  });

  const bookingDetails = {
    hotelName: hotelInfo?.hotel?.name,
    location: `${hotelInfo?.hotel?.city}, ${hotelInfo?.hotel?.country}`,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    adults: search.adultCount,
    children: search.childCount,
    pricePerNight: 140,
  };


  const totalNights = Math.ceil(
    (bookingDetails.checkOut.getTime() - bookingDetails.checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="mt-5 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Confirm Your Booking</h1>
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Booking Details Section */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Hotel className="w-6 h-6 mr-3" />
                    <span className="text-lg">{bookingDetails.hotelName}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-3" />
                    <span className="text-lg">{bookingDetails.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 mr-3" />
                    <span className="text-lg">
                      {format(bookingDetails.checkIn, 'MMM dd, yyyy')} - {format(bookingDetails.checkOut, 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-6 h-6 mr-3" />
                    <span className="text-lg">
                      {bookingDetails.adults} Adults, {bookingDetails.children} Children
                    </span>
                  </div>
                  <div className="text-lg font-semibold">
                    Total stay: {totalNights} nights
                  </div>
                  <div className="text-2xl  font-bold mt-6">
                    Total: ₹{paymentIntentData?.totalPrice}
                  </div>
                </div>
              </div>

              {/* Confirmation Details Section with Stripe Elements */}
              <Elements stripe={stripePromise}>
                <BookingForm 
                  bookingDetails={bookingDetails}
                  currentUser={currentUser}
                  totalNights={totalNights}
                  paymentIntentData={paymentIntentData}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
