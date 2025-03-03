import React from 'react'
import styled from 'styled-components'
import { cityCoords, HourlyGroupedByDay } from '@/utils/interfaces/Data'
import { CityChildCard } from '../cards/cityChildCard';
import { Recharts } from '../../Recharts/recharts';
import MapBoxPage from '../map/mapbox';

interface SearchResultsProps {
  hourly: HourlyGroupedByDay,
  name:string,
  degree:string,
  cityCoord:cityCoords|undefined,
}

export const SearchResults: React.FC<SearchResultsProps> = ({ hourly,name,degree,cityCoord }) => {

  return (
    <DIV>
      <H2>Time prediction results for {name}</H2>
      <InfoDiv>
      <h3>INFO:</h3>
      <P>the current unit of temperature measurement is {degree}</P>
      </InfoDiv>
      <MainDiv>
        {hourly &&
          Object.entries(hourly).map(([date, dayData], i) => {
            return(
            <BoxDiv key={i}>
              <CityChildCard Hourly={dayData.hours[0]} day={date} />
            </BoxDiv>
          )})}
      </MainDiv>
      <H2>Daily Temp</H2>
      <Recharts hourly={hourly} kindof={true} />
      <H2>Hourly Temp</H2>
      <Recharts hourly={hourly} kindof={false} />
      <MapDiv>
          <MapBoxPage cityCoord={cityCoord} city={name} tempUnit={degree}/>
      </MapDiv>
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

const H2 = styled.h2({
  margin:"0"
})

const P = styled.p`
  font-ize:14px;
  display:block;
  @media (min-width:500px) {
  display:inline;
  }
`

const InfoDiv = styled.div`
  flex-wrap;
  width:100%;
  display:flex;
  gap:5px;
  align-items:center;
`

const MainDiv = styled.div({
  width:"100%",
  display:"flex",
  flexWrap:"wrap",
  gap:"20px",
  alignItems:"center",
  marginBottom:"20px"
})

const MapDiv = styled.div({
  width:"100%",
  display:"flex",
  alignItems:"center",
  marginTop:"20px",
  justifyContent:"center",
})


const BoxDiv = styled.div`
  width:100%;
  @media (min-width: 900px) {
  width:47%;
}
  `


