import  { AxiosError } from "axios";
import axiosClient from "./axiosClient";
import { SignUpFormData } from "./pages/SignUp";
import { SignInForm } from "./pages/Login";
import { Hotel } from "./pages/MyHotels";
import {HotelSearchResponse,  HotelType,  UserType, paymentIntentResposne} from '@prash766/shared-types/dist'
import { BookingFormData } from "./pages/BookingPage";

export const signUp = async (formData: SignUpFormData) => {
  const res = await axiosClient.post("/users/register", formData);
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
};

export const signIn = async (formData: SignInForm) => {
  const res = await axiosClient.post("/users/login", formData);
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  return res.data;
};

export const addHotel = async (hotelFormData: FormData) => {
  const res = await axiosClient.post("/hotels/add", hotelFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(res);
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  return res.data
};

export const fetchMyHotels = async () => {
  const res = await axiosClient.get("/hotels/");
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  return res.data.hotels;
};

export const fetchMyHotelId = async (hotelId: string): Promise<Hotel> => {
  const res = await axiosClient.get(`/hotels/${hotelId}`);
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  return res.data.hotel;
};

export const updateMyHotels = async (id: string, hotelFormData: FormData) => {
  const res = await axiosClient.put(`/hotels/edit/${id}`, hotelFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if(res.status!==200){
    throw new Error(res.data.message)
  }
  return res.data
};

export const logOut = async () => {
  const res = await axiosClient.get("/users/logout");
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  return res.data;
};

export const validateToken = async () => {
  const res = await axiosClient.get("/users/validate-token");
  if (res.status === 400) {
    throw new AxiosError("Token Invalid");
  }
  return res.data;
};


export type SearchParams = {
  destination?: string,
  checkIn?: string,
  checkOut?:string,
  adultCount?:string,
  childCount?:string,
  page?:string,
  facilities?: string[],
  types?:string[],
  stars?:string[],
  maxPrice?:string,
  minPrice?:string,
  sortOption?:string

}
 export const searchHotels= async(searchParams :SearchParams): Promise<HotelSearchResponse>=>{
  const queryParams = new URLSearchParams()
  queryParams.append("destination" , searchParams.destination || "")
  queryParams.append("checkIn" , searchParams.checkIn || "")
  queryParams.append("checkOut" , searchParams.checkOut || "")
  queryParams.append("adultCount" , searchParams.adultCount || "")
  queryParams.append("childCount" , searchParams.childCount || "")
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("minPrice", searchParams.minPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");
  queryParams.append("page" ,searchParams.page || "1" )

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

const res = await axiosClient(`/hotels/query/search?${queryParams}`)
if(res.status!==200){
  throw new Error("Error Fetching Hotels")
}
return res.data
 }

 export const fetchHotelById = async(hotelId : string) =>{
  const res = await axiosClient.get(`/hotels/get/${hotelId}`)
  if(res.status!==200){
    throw new Error(res.data.message)
  }
  return res.data
  
 }


 export const fetchUserDetails = async() :Promise<UserType>=>{
  const res = await axiosClient.get('/users/me')
  if(res.status!==200){
    throw new Error(res.data.message)
  }
  return res.data.user
 }

 export const createPaymentIntent =async (hotelId:string , numberOfNights:string):Promise<paymentIntentResposne>=>{

  const res = await axiosClient.post(`/hotels/${hotelId}/bookings/payment-intent`, {
    numberOfNights
  })
  if(res.status!==200){
    throw new Error(res.data.message)
  }
  return res.data
 }


 export const createBooking = async(formData:BookingFormData ) =>{
  const res = await axiosClient.post(`/hotels/${formData.hotelId}/bookings`,{formData})
  if(res.status!==200){
    throw new Error(res.data.message|| "Error While Booking the Hotel")
  }
  return res.data

 }


 export const fetchMyBooking = async(): Promise<HotelType[]>=>{
  const res = await axiosClient.get(`/hotels/myhotels/bookings`)
  if(res.status!==200){
    throw new Error("Unable to fetch Bookings");
    
  }
  return res.data.results
 }

 export const allHotels = async():Promise<HotelType[]> =>{
  const res = await axiosClient.get('/hotels/get')
  if(res.status!==200){
    throw new Error("Error Fetching the Hotels")
  }
  return res.data
 }