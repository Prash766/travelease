import { AxiosError } from "axios";
import axiosClient from "./axiosClient";
import { SignUpFormData } from "./pages/SignUp";
import { SignInForm } from "./pages/Login";
import { Hotel } from "./pages/MyHotels";

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
  return res.data;
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
