
import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { HourlyData } from '@/utils/interfaces/Data';
import WeatherDropDown from '../../assets/weatherDropDown';

interface CityChil{
  Hourly:HourlyData,
  day:string
}


export const CityChildCard:React.FC<CityChil> = ({Hourly,day}) => {

  const date = new Date(day);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
  const dayNumber = date.getDate()
  const [active,setActive]=useState<boolean>(false)
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>)=>{
    setActive(!active)
  }
  return (
    <Container onClick={handleClick}>
      <WeatherCard>
        <BlurBackground />
        <CardContent>
          <Temperature>{Math.round(Hourly.temp)}&deg;</Temperature>
          <CenteredDiv>
            <DayAndDay>{dayName} {dayNumber}</DayAndDay>
            <FeelsLike>Feels Like: {Hourly.feelsLike.toString()}&deg;</FeelsLike>
          </CenteredDiv>
          <ImgDiv>
              <Image
                className="animate-upAndDown"
                fill
                alt=""
                src={`http://openweathermap.org/img/wn/${Hourly.icon}.png`}
              />
          </ImgDiv>
          <TempDetails>
            <TempMin>
              <TempMinLabel>Min</TempMinLabel>
              <TempMinValue>{Hourly.tempMin.toString()}&deg;</TempMinValue>
            </TempMin>
            <TempMax>
              <TempMaxLabel>Max</TempMaxLabel>
              <TempMaxValue>{Hourly.tempMax.toString()}&deg;</TempMaxValue>
            </TempMax>
          </TempDetails>
          <WeatherDropDown/>
        </CardContent>
      </WeatherCard>

      <MoreInfoCard $active={active}>
          <BlurBackground />
            <DropedCardContent>
              <TopContent>
                  <DayAndDay>{Hourly.description}</DayAndDay>
              </TopContent>

                <TopContent>
                    <CenteredDiv>
                      <p>Humidity</p>
                      <FeelsLike>{Hourly.humidity}</FeelsLike>
                    </CenteredDiv>
                    <CenteredDiv>
                      <p>Wind speed</p>
                      <FeelsLike>{Hourly.windSpeed}</FeelsLike>
                    </CenteredDiv>
                    <CenteredDiv>
                      <DayAndDay>{dayName} {dayNumber}</DayAndDay>
                      <FeelsLike>Feels Like: {Hourly.feelsLike.toString()}&deg;</FeelsLike>
                    </CenteredDiv>
                    {/* <ImgDiv>
                        <Image
                          className="animate-upAndDown"
                          fill
                          alt=""
                          src={`http://openweathermap.org/img/wn/${Hourly.icon}.png`}
                        />
                    </ImgDiv> */}
                    <TempDetails>
                      <TempMin>
                        <TempMinLabel>Min</TempMinLabel>
                        <TempMinValue>{Hourly.tempMin.toString()}&deg;</TempMinValue>
                      </TempMin>
                      <TempMax>
                        <TempMaxLabel>Max</TempMaxLabel>
                        <TempMaxValue>{Hourly.tempMax.toString()}&deg;</TempMaxValue>
                      </TempMax>
                    </TempDetails>
                    <WeatherDropDown/>
              </TopContent>
            </DropedCardContent>
      
      </MoreInfoCard>
    </Container>
  );
};



const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position:relative;
`;

const CenteredDiv = styled.div({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"column",
  gap:"4px"
})

const WeatherCard = styled.div`
  background-color: rgb(33, 33, 33);
  width: 100%;
  height: 200px;
  border-radius: 7px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 640px) {
    height: 100px;
    width: 100%;
  }
`;

const MoreInfoCard = styled.div<{ $active: boolean }>`
  bottom:${({ $active }) => ($active ? '0' : '-100px')};
  opacity:${({ $active }) => ($active ? '1' : '0')};  
  background-color: rgb(33, 33, 33);
  transition: .4s ease-in;
  z-index:1;
  width: 100%;
  height: 200px;
  right:0;
  left:0;
  border-radius: 7px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 640px) {
    height: 100px;
    width: 100%;
  }
`;



const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  gap:2em;
  align-items: center;
  background-color: var(--dartyGray);
  width: 100%;
  height: 100%;
  border-radius: 7px;
  cursor: pointer;
  border: 1px solid var(--Cardborder);

  @media (min-width: 640px) {
    width: 100%;
    height: 100px;
  }
`;

const DropedCardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color:white;
  background-color: var(--darkBlue);
  flex-direction:column;
  width: 100%;
  height: 100%;
  gap:1em;
  border-radius: 7px;
  cursor: pointer;
  @media (min-width: 640px) {
    width: 100%;
    height: 100px;
  }
`;

const TopContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap:2em;
  @media (min-width: 640px) {
    width: 100%;
  }
`;

const BlurBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(8px);
  z-index: 0;
`;



const DayAndDay = styled.p`
  font-weight: bold;
  font-size: 0.9em;
  letter-spacing: 1.2px;
  color: white;
  text-transform: uppercase;
  text-align: center;
  animation: shimmer 1.5s infinite;
  margin:0;
`;

const FeelsLike = styled.p`
  font-size: 0.8em;
  letter-spacing: 1.2px;
  color: #b3b3b3;
  margin:0;
`;

const ImgDiv = styled.div`
  margin: 5px 0px;
  position:relative;
  width:55px;
  height:45px;
`;

const Temperature = styled.p`
  font-size: 1.8em;
  color: white;
  margin:0;
`;

const TempDetails = styled.div`
  display: flex;
  justify-content: center;
  margin:0;
  `;

const TempMin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
  padding-right: 10px;
  margin:0;
`;

const TempMinLabel = styled.p`
  font-size: 0.9em;
  font-weight: 600;
  color: white;
    margin:0;
`;

const TempMinValue = styled.p`
  font-size: 0.8em;
  color: #b3b3b3;
  margin:0;
`;

const TempMax = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  padding-left: 10px;
  margin:0;
  border-left: 2px solid white;
`;

const TempMaxLabel = styled.p`
  font-size: 0.9em;
  font-weight: 600;
  color: white;
    margin:0;
`;

const TempMaxValue = styled.p`
  font-size: 0.8em;
  color: #b3b3b3;
    margin:0;
`;

