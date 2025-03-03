"use client";

import React from 'react'
import styled from "styled-components";
import Weather from "@/components/UI/homePage/weather/weather"

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


export default function Home() {
  return (
        <MainBox>
          <Weather/>
        </MainBox>
  );
}
