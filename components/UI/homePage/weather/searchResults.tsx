import React from 'react'
import styled from 'styled-components'
import { CityParentCard } from './cityParentCard'
import { Daily_Data, HourlyGroupedByDay } from '@/utils/interfaces/Data'
import { CityChildCard } from './cityChildCard';

interface SearchResultsProps {
  dailydata: Daily_Data;
  hourly?: HourlyGroupedByDay;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ dailydata, hourly }) => {
  console.log(hourly);

  return (
    <DIV>
      <h2>Time prediction results for Lisbon</h2>
      <MainDiv>
        <BoxDiv>
          <CityParentCard dailyData={dailydata} />
        </BoxDiv>
        {hourly &&
          Object.entries(hourly).map(([date, dayData], i) => (
            <BoxDiv key={i}>
              <CityChildCard Hourly={dayData.hours[0]} day={date} />
            </BoxDiv>
          ))}
      </MainDiv>
    </DIV>
  );
};

const DIV = styled.div({
    display:"flex", 
    flexDirection:"column",
    gap:"5px",
    fontSize:"12px",
    width:"100%",
})

const MainDiv = styled.div({
  width:"100%",
  display:"flex",
  flexWrap:"wrap",
  gap:"20px"
})

const BoxDiv = styled.div({
  width:"45%",
})
