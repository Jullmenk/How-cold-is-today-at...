"use client"

import { createContext, useState } from "react";

interface GlobalContextType {
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
    temp: string;
    setTemp: React.Dispatch<React.SetStateAction<string>>;
    load: boolean;
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  }

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalMainProvider = ({children}:{children:React.ReactNode}) =>{

    const [city,setCity]= useState<string>("")
    const [temp,setTemp]= useState<string>("Celcius")
    const [load,setLoad] = useState<boolean>(false)


    return (
        <GlobalContext.Provider
        value={{load,setLoad,city,setCity,temp,setTemp}}>
            {children}
        </GlobalContext.Provider>
    )


}