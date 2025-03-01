"use client";

import React, { useContext, useEffect, useState } from 'react';
import WeatherMaingPage from './someCities';
import styled from 'styled-components';
import SearchForm from '../forms/searchForm';
import TempManagement from '../forms/tempManagement';
import { GlobalContext } from '@/utils/hooks/useContext';
import {HourlyGroupedByDay } from '@/utils/interfaces/Data';
import { SearchResults } from './searchResults';
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { fetchWeather } from '@/utils/functions';



const Weather = () => {
  const [err,setErr] = useState<string>("")
  const [hourlyData, setHourlyData] = useState<HourlyGroupedByDay|undefined>(undefined);
  const [load,setLoad]=useState<boolean>(false)
  const [ready,setReady]=useState<string>("")

  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("WeatherComponent must be used within a GlobalMainProvider");
  }

  const { weather,temp } = context;
  
  useEffect(() => {
    if(weather){
      setLoad(true);
      setErr("")
      setReady("")
      setHourlyData(undefined)
      setTimeout(() => {
        fetchWeather({weather,setLoad,setHourlyData,setErr,temp});
      }, 1000);
    }
  }, [weather,temp]);

  useEffect(() => {
    if (!load && hourlyData) {
      setReady("on");
    } else {
      setReady("");
    }
  }, [load, hourlyData]);

  return (
    <Wrapper>
      <Header>
          <Title>
            Weather Today
          </Title>
      </Header>
      <InpandOpt>
          <SearchForm/>
          <TempManagement/>
      </InpandOpt>
          {
            load&&(<ClimbingBoxLoader size={20} color='black'/>)
          }
      <AnimatedDiv $ready={ready}>
          {
              err?
              (<p>{err}</p>)
              :
              (hourlyData&&
              <SearchResults name={weather} degree={temp} hourly={hourlyData}/>)
          }
      </AnimatedDiv>
      <WeatherMaingPage />
    </Wrapper>
  );
};
export default Weather;




const Wrapper = styled.div`
  padding-bottom: 10px;
  margin-top: 100px;
  display:flex;
  flex-direction:column;
  gap:25px;
`;

const AnimatedDiv = styled.div<{ $ready: string }>`
  max-height: ${({ $ready }) => ($ready === "on" ? '90vh' : '20px')};
  opacity:${({ $ready }) => ($ready === "on" ? '1' : '0')};
  width: 100%;
  overflow: hidden;
  transition: .4s ease-in-out;
`;

const InpandOpt = styled.div({
    display:"flex",
    width:"100%",
    gap:"20px",
    alignItems:"center",
})

const Header = styled.div`
  border-bottom: 2px solid var(--gray);
  height: 40px;
  width: 100%;
  padding-bottom: 2px;
  display: flex;
  margin-top: 20px;
`;

const Title = styled.h1`
  position: relative;
  font-size: 1.25rem;
  font-weight: bold;
  color:  var(--darkBlue);
  text-transform:uppercase;
`;