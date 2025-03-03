"use client";

import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Weather from "@/components/UI/homePage/weather/weather"
import ClimbingBoxLoader from "react-spinners/ClipLoader";

const MainBox = styled.div`
  @media (min-width: 900px) {
  padding:0 6% 50px 6%;
  }  

  @media (min-width: 1100px) {
  padding:0 13% 50px 13%;
  }

  @media (min-width: 1350px) {
  padding:0 17% 50px 17%;
  }

@media (min-width: 1600px) {
  padding:0 25% 50px 25%;
  }
  min-height:70vh;
  `
const Div = styled.div({
  width:"100%",
  display:"flex",
  justifyContent:"center",
})

export default function Home() {
  
  const [load,setisLoad]=useState<boolean>(true)

  useEffect(()=>{
    setTimeout(() => {
      setisLoad(false)
    }, 500);
  },[])

  
  return (
        <MainBox>
          {
            load?
            <Div>
              <ClimbingBoxLoader color='black' size={20}/>
            </Div>
            :
            <Weather/>

          }
        </MainBox>
  );
}
