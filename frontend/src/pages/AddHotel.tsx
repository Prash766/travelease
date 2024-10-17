import { useMutation } from "@tanstack/react-query"
import ManageHotelForm from "../forms/ManageHotelForm"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext"

const AddHotels = ()=>{
    const {showToast} = useAppContext()
    const {mutate , isPending} = useMutation({
        mutationFn: apiClient.addHotel,
        onSuccess:()=>{
            showToast({message:"Hotel Added" , type:"SUCCESS"})
        },
        onError: ()=>{
            showToast({message:"Error Saving Hotel" , type:"ERROR"})
        }


    })

    const handleSave = (hotelFormData: FormData)=>{
        mutate(hotelFormData)

    }

    return( <ManageHotelForm onSave ={handleSave}  isPending ={isPending}/>)
}

export default AddHotels