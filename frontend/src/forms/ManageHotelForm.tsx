import { FormProvider, useForm } from "react-hook-form"
import HotelDetailsSection from "./HotelDetailsSection"

export type HotelFormType = {
  name:string,
  city:string,
  country:string,
  description:string,
  type:string,
  pricePerNight:number,
  starRating:number,
  facilities:string[],
  adultCount:number,
  childCount:number,
  imageUrls:FileList,
  

}


const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormType>()
  return (
    <FormProvider {...formMethods}>
<form>
  <HotelDetailsSection/>
</form>
    </FormProvider>
  )
}

export default ManageHotelForm