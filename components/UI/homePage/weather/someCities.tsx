import React from 'react';
import WeatherCart from '../cards/WeatherCard';
import styled from 'styled-components';

const DIV = styled.div`
  width: 100%;
  display: flex;
  gap: 4rem;
  align-items: center;
  flex-wrap: wrap;
`;

const WeatherMainPage= () => {
  return (
    <DIV>
         <WeatherCart />
         <WeatherCart />
         <WeatherCart />
         <WeatherCart />
    </DIV>
  );
};

export default WeatherMainPage;
