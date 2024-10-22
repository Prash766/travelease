import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm";
import ErrorBoundary from "../components/ErrorBoundary";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const queryClient = useQueryClient()
  const { showToast } = useAppContext();

  const { data: hotelInfo, isLoading, isError } = useQuery({
    queryKey: ["hotelDetails", hotelId],
    queryFn: () => apiClient.fetchMyHotelId(hotelId || ""),
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["editHotel", hotelId],
    mutationFn: (hotelFormData: FormData) =>
      apiClient.updateMyHotels(hotelId as string, hotelFormData),
    onSuccess: async() => {
    await queryClient.invalidateQueries({
        queryKey:["hotelDetails", hotelId]
      })
      showToast({ message: "Hotel Updated", type: "SUCCESS" });

    },
    onError: () => {
      showToast({ message: "Error Updating Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <ErrorBoundary />;

  return (
    <ManageHotelForm
      isPending={isPending}
      onSave={handleSave}
      btnName={"Save Changes"}
      hotel={hotelInfo}
    />
  );
};

export default EditHotel;
