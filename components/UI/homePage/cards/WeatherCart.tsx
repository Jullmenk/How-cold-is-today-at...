"use client";

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';



const WeatherCart = () => {

  return (
    <Container>
      <WeatherCard>
        <BlurBackground />
        <CardContent>
          <CityName>Benguela</CityName>
          <FeelsLike>Feels Like: 30°</FeelsLike>
          <ImgDiv>
              <Image
                className="animate-upAndDown"
                fill
                alt=""
                src={`/weathers/sun-1.png`}
              />
          </ImgDiv>
          <Temperature>10°</Temperature>
          <TempDetails>
            <TempMin>
              <TempMinLabel>Min</TempMinLabel>
              <TempMinValue>3°</TempMinValue>
            </TempMin>
            <TempMax>
              <TempMaxLabel>Max</TempMaxLabel>
              <TempMaxValue>5°</TempMaxValue>
            </TempMax>
          </TempDetails>
        </CardContent>
      </WeatherCard>
    </Container>
  );
};

export default WeatherCart;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  overflow: hidden;
`;

const WeatherCard = styled.div`
  background-color: rgb(33, 33, 33);
  width: 100%;
  height: 200px;
  border-radius: 16px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    height: 230px;
    width: 100%;
  }
`;

const BlurBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--darkBlue);
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(8px);
  z-index: 0;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:7px;
  align-items: center;
  background-color: var(--dartyGray);
  width: 100%;
  height: 100%;
  border-radius: 16px;
  cursor: pointer;
  border: 1px solid var(--Cardborder);

  @media (min-width: 640px) {
    width: 170px;
    height: 230px;
  }
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
  font-size: 0.7em;
  letter-spacing: 1.2px;
  color: #b3b3b3;
  margin:0;
`;

const ImgDiv = styled.div`
  margin: 5px 0px;
  position:relative;
  width:45px;
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
  width: 100%;
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
  font-size: 0.7em;
  font-weight: 600;
  color: white;
    margin:0;
`;

const TempMinValue = styled.p`
  font-size: 0.6em;
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
  font-size: 0.7em;
  font-weight: 600;
  color: white;
    margin:0;
`;

const TempMaxValue = styled.p`
  font-size: 0.6em;
  color: #b3b3b3;
    margin:0;
`;

