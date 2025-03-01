"use client";

import React, { useContext, useEffect, useState } from 'react';
import WeatherMaingPage from './WeatherMaingPage';
import styled from 'styled-components';
import SearchForm from './searchForm';
import TempManagement from './tempManagement';
import { GlobalContext } from '@/utils/hooks/useContext';
import { Daily_Data, HourlyData, HourlyGroupedByDay } from '@/utils/interfaces/Data';
import { SearchResults } from './searchResults';



const Weather = () => {
  const [err,setErr] = useState<any>("")
  const [hourlyData, setHourlyData] = useState<HourlyGroupedByDay>({});
    const [dailyData, setDailyData] = useState<Daily_Data| undefined>(undefined);
  const [load,setLoad]=useState<boolean>(true)

  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("WeatherComponent must be used within a GlobalMainProvider");
  }

  const { weather, setWeather } = context;
  
  useEffect(() => {
    const fetchWeather = async () => {
      setLoad(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=lisboa&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
  
        const data = await response.json();
  
        // Step 1: Map the raw data into HourlyData format (without tempMin/tempMax for now)
        const filteredData: HourlyData[] = data.list.map((item: any) => ({
          time: new Date(item.dt * 1000),
          temp: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          windSpeed: item.wind.speed,
          humidity: item.main.humidity,
          rain: item.rain ? item.rain["3h"] : 0,
          feelsLike: Math.round(item.main.feels_like),
          tempMin: 0, // Placeholder, will be updated later
          tempMax: 0, // Placeholder, will be updated later
        }));
  
        // Step 2: Group by day and calculate daily min/max temperatures
        const hourlyGroupedByDay: HourlyGroupedByDay = filteredData.reduce(
          (acc: HourlyGroupedByDay, item: HourlyData) => {
            const dateKey = item.time.toISOString().split("T")[0];
            if (!acc[dateKey]) {
              const date = new Date(dateKey);
              acc[dateKey] = {
                details: {
                  tempMin: item.temp,
                  tempMax: item.temp,
                  dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
                  dayNumber: date.getDate(),
                },
                hours: [],
              };
            }
            acc[dateKey].hours.push(item);
            acc[dateKey].details.tempMin = Math.min(acc[dateKey].details.tempMin, item.temp);
            acc[dateKey].details.tempMax = Math.max(acc[dateKey].details.tempMax, item.temp);
            return acc;
          },
          {} as HourlyGroupedByDay
        );
  
        // Step 3: Update each hourly entry with the daily min/max
        Object.keys(hourlyGroupedByDay).forEach((dateKey) => {
          const dailyMin = Math.round(hourlyGroupedByDay[dateKey].details.tempMin);
          const dailyMax = Math.round(hourlyGroupedByDay[dateKey].details.tempMax);
          hourlyGroupedByDay[dateKey].hours = hourlyGroupedByDay[dateKey].hours.map((item) => ({
            ...item,
            tempMin: dailyMin,
            tempMax: dailyMax,
          }));
        });
  
        // Step 4: Limit to 5 days
        const limitedDays = Object.keys(hourlyGroupedByDay)
          .slice(0, 5)
          .reduce((acc: HourlyGroupedByDay, key) => {
            acc[key] = hourlyGroupedByDay[key];
            return acc;
          }, {} as HourlyGroupedByDay);
  
        // Step 5: Set the first day's daily data for the parent card
        const firstDayKey = Object.keys(limitedDays)[0];
        const firstDay = limitedDays[firstDayKey];
        const firstForecast = firstDay.hours[0];
        setDailyData({
          tempMin: firstDay.details.tempMin,
          tempMax: firstDay.details.tempMax,
          description: firstForecast.description,
          icon: firstForecast.icon,
          current: Math.round(firstForecast.temp),
          feelsLike: firstForecast.feelsLike,
          dayName: firstDay.details.dayName,
          dayNumber: firstDay.details.dayNumber,
        });
  
        // Step 6: Set the state
        setHourlyData(limitedDays);
        setWeather(data);
      } catch (err) {
        console.log(err);
        setErr(err);
      } finally {
        setLoad(false);
        console.log("Número de dias disponíveis:", Object.keys(hourlyData).length);
      }
    };
    fetchWeather();
  }, []);
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
      {dailyData &&
        <SearchResults dailydata={dailyData} hourly={hourlyData}/>}
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