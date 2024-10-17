import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";

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
  onSave :(hotelFormData: FormData) => void;
  isPending: boolean
}

const ManageHotelForm = ({onSave , isPending}: Props) => {
  const formMethods = useForm<HotelFormType>();
  return (
    <FormProvider {...formMethods}>
        <HotelDetailsSection onSave = {onSave}  isPending = {isPending}/>
    </FormProvider>
  );
};

export default ManageHotelForm;
