"use client";

import React from 'react'
import styled from "styled-components";
import Weather from "@/components/UI/homePage/weather/weather"

const MainBox = styled.div({
  padding:"0 25% 50px 25%",
})


export default function Home() {
  return (
        <MainBox>
          <Weather/>
        </MainBox>
  );
}
