import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";
import { Hotel } from "../pages/MyHotels";

export type HotelFormType = {
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
  imageUrls: FileList;
};

type Props={
  hotel?: Hotel
  onSave :(hotelFormData: FormData) => void;
  isPending: boolean
  btnName: string 
}

const ManageHotelForm = ({onSave , isPending, hotel , btnName}: Props) => {
  const formMethods = useForm<HotelFormType>();
  return (
    <FormProvider {...formMethods}>
        <HotelDetailsSection  btnName= {btnName} onSave = {onSave} hotel={hotel}  isPending = {isPending}/>
    </FormProvider>
  );
};

export default ManageHotelForm;
