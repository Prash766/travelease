import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import * as apiClient from '../api-client'
import React from "react";
import { toast } from "sonner";
import { loadStripe, Stripe } from "@stripe/stripe-js";


const STRIPE_PUB_KEY= import.meta.env.VITE_STRIPE_PUB_KEY||""

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isVerified:boolean
  stripePromise : Promise<Stripe | null>

};

const AppContext = createContext<AppContext | undefined>(undefined);
const stripePromise = loadStripe(STRIPE_PUB_KEY)


export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const {isError} = useQuery({
        queryKey:["validateUser"],
        queryFn:apiClient.validateToken
        
    })
  return (
    <AppContext.Provider
      value={{
        showToast: (message) => {
          console.log(message);
          if (message.type === "ERROR") {
            toast.error(message.message);
          } else {
            toast.success(message.message);
          }
        },
        isVerified: !isError,
        stripePromise
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
