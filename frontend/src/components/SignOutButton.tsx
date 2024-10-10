import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";



const SignOutButton = () => {
    const queryClient = useQueryClient()
  const { showToast } = useAppContext();
  const navigate  = useNavigate()
  const mutation = useMutation({
    mutationFn: apiClient.logOut,
    onSuccess: async() => {
        await queryClient.invalidateQueries({
            queryKey:['validateUser']
        })
      showToast({ message: "Logged Out", type: "SUCCESS" });
      navigate('/',{replace:true})
    },
    onError: (error:AxiosError)=>{
        if(error.response && error.response.data){
            const message = (error.response.data as {message : string}).message
            showToast({message , type:"ERROR"})
        }
    }
  });
  const handleClick = ()=>{
    mutation.mutate()
  } 


  return (
    <button
      onClick={handleClick}
      className="flex text-black font-semibold justify-center items-center px-4 bg-white  rounded-lg hover:bg-slate-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
