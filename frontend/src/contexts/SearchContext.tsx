import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};
type SearchContextProviderProps = {
  children: React.ReactNode;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState<Date>(() => {
    const savedDate = sessionStorage.getItem("checkIn");
    return savedDate ? new Date(savedDate) : new Date();
  });
  
  const [checkOut, setCheckOut] = useState<Date>(() => {
    const savedDate = sessionStorage.getItem("checkOut");
    if (savedDate) {
      return new Date(savedDate); 
    } else {
      const date = new Date();
      date.setDate(date.getDate() + 1); 
      return date;
    }
  });
  
  const [adultCount, setAdultCount] = useState<number>(()=>parseInt(sessionStorage.getItem('adultCount') as string) || 1);
  const [childCount, setChildCount] = useState<number>(()=>parseInt(sessionStorage.getItem('childCount') as string) || 0);
  const [hotelId, setHotelId] = useState<string>(()=>sessionStorage.getItem("hoteId")|| "");

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }
    sessionStorage.setItem("destination" , destination)
    sessionStorage.setItem("checkIn" , checkIn.toISOString())
    sessionStorage.setItem("checkOut" , checkOut.toISOString())
    sessionStorage.setItem("adultCount" , adultCount.toString())
    sessionStorage.setItem("childCount" , childCount.toString())

  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
