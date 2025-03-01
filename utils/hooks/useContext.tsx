"use client"

import { createContext, useState } from "react";

interface GlobalContextType {
    weather: any;
    setWeather: React.Dispatch<React.SetStateAction<any>>;
    load: boolean;
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  }

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalMainProvider = ({children}:{children:React.ReactNode}) =>{

    const [weather,setWeather]= useState<any | undefined>(undefined)
    const [load,setLoad] = useState<boolean>(false)


    return (
        <GlobalContext.Provider
        value={{load,setLoad,weather,setWeather}}>
            {children}
        </GlobalContext.Provider>
    )


}