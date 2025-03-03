"use client";

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchForm from '../forms/searchForm';
import TempManagement from '../forms/tempManagement';
import { GlobalContext } from '@/utils/hooks/useContext';
import {cityCoords, HourlyGroupedByDay } from '@/utils/interfaces/Data';
import { SearchResults } from './searchResults';
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { fetchWeather, firstLoadIpFound } from '@/utils/functions';



const Weather = () => {
  const [err,setErr] = useState<string>("")
  const [hourlyData, setHourlyData] = useState<HourlyGroupedByDay|undefined>(undefined);
  const [cityCoord,setCityCoord] = useState<cityCoords|undefined>(undefined)
  const [load,setLoad]=useState<boolean>(false)
  const [ready,setReady]=useState<string>("")

  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("WeatherComponent must be used within a GlobalMainProvider");
  }

  const { city,temp,setCity } = context;
  
  useEffect(() => {
    if(city){
      setLoad(true);
      setErr("")
      setReady("")
      setHourlyData(undefined)
      setTimeout(() => {
        fetchWeather({city,setLoad,setHourlyData,setErr,setCityCoord,temp});
      }, 1000);
    }
  }, [city,temp]);

  useEffect(() => {
    if (!load && hourlyData) {
      setReady("on");
    } else {
      setReady("");
    }
  }, [load, hourlyData]);

  useEffect(()=>{

    const getIP = async ()=>{
      const {cityFound} = await firstLoadIpFound()
      setCity(cityFound)
    }
    getIP()
    
  },[setCity])

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
        err&& <p>{err}</p>
      }
          {
            load&&(<ClimbingBoxLoader size={20} color='black'/>)
          }
      <AnimatedDiv $ready={ready}>
          {
              !err&&
              hourlyData&&
              <SearchResults cityCoord={cityCoord} name={city} degree={temp} hourly={hourlyData}/>
          }
      </AnimatedDiv>
    </Wrapper>
  );
};
export default Weather;




const Wrapper = styled.div`
  padding-bottom: 10px;
  margin-top: 10px;
  @media (min-width: 600px) {
  }  
  display:flex;
  flex-direction:column;
  gap:25px;
`;

const AnimatedDiv = styled.div<{ $ready: string }>`
  max-height: ${({ $ready }) => ($ready === "on" ? '1000vh' : '20px')};
  opacity:${({ $ready }) => ($ready === "on" ? '1' : '0')};
  width: 100%;
  overflow: hidden;
  transition: .4s ease-in-out;
`;

const InpandOpt = styled.div`
    display:flex;
    flex-wrap:wrap;
    width:100%;
    gap:20px;
    alignItems:center;
`

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