import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import * as apiClient from '../api-client'
import React from "react";
import { toast } from "sonner";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isVerified:boolean
};

const AppContext = createContext<AppContext | undefined>(undefined);

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
        isVerified: !isError
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
