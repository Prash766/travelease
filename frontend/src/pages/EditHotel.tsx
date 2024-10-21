import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import ManageHotelForm from "../forms/ManageHotelForm"
import ErrorBoundary from "../components/ErrorBoundary"

const EditHotel =()=>{
    const {hotelId} = useParams()
    console.log(hotelId)
    const {data:hotelInfo , isLoading , isError } = useQuery({
        queryKey:['hotelDetails'],
        queryFn: ()=>apiClient.fetchMyHotelId(hotelId || ""),
        enabled:!!hotelId

    })
    console.log(hotelInfo)
    if(isError) return <ErrorBoundary/>
    return <ManageHotelForm isPending={isLoading} onSave={()=>{}} btnName={"Save Changes"} hotel={hotelInfo} />




}

export default EditHotel
