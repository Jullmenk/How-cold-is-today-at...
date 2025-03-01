
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Daily_Data } from '@/utils/interfaces/Data';



export const CityParentCard = ({dailyData}:{dailyData:Daily_Data}) => {

  return (
    <Container>
      <WeatherCard>
        <BlurBackground />
        <CardContent>
          <Temperature>{dailyData.current.toString()}°</Temperature>
          <CenteredDiv>
            <CityName>{dailyData.dayName} {dailyData.dayNumber.toString()}</CityName>
            <FeelsLike>Feels Like: {dailyData.feelsLike.toString()}°</FeelsLike>
          </CenteredDiv>
          <ImgDiv>
              <Image
                className="animate-upAndDown"
                fill
                alt=""
                src={`http://openweathermap.org/img/wn/${dailyData.icon}.png`}
              />
          </ImgDiv>
          <TempDetails>
            <TempMin>
              <TempMinLabel>Min</TempMinLabel>
              <TempMinValue>{dailyData.tempMin.toString()}</TempMinValue>
            </TempMin>
            <TempMax>
              <TempMaxLabel>Max</TempMaxLabel>
              <TempMaxValue>{dailyData.tempMax.toString()}</TempMaxValue>
            </TempMax>
          </TempDetails>
        </CardContent>
      </WeatherCard>
    </Container>
  );
};


// Styled Components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
    height: 70px;
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
  background-color: rgba(65, 65, 65, 0.308);
  width: 100%;
  height: 100%;
  border-radius: 7px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.089);

  @media (min-width: 640px) {
    width: 100%;
    height: 70px;
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



const CityName = styled.p`
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

