import React, { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import { cityCoords, HourlyGroupedByDay } from '@/utils/interfaces/Data';
import { loadMap } from '@/utils/functions';


export const MapBoxPage = ({
  cityCoord,
  city,
  tempUnit,
  hourlyGroupedByDay,
}: {
  hourlyGroupedByDay: HourlyGroupedByDay;
  cityCoord: cityCoords | undefined;
  city: string;
  tempUnit: string;
}) => {
  
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
      loadMap({cityCoord,city,tempUnit,mapContainerRef,mapRef,hourlyGroupedByDay})

      const mapInstance = mapRef.current;

      return () => {
        if (mapInstance) {
          mapInstance.remove();
        }
      };
  }, [cityCoord, city, tempUnit, hourlyGroupedByDay]); 

  return <Div ref={mapContainerRef} id="map" />;
};

const Div = styled.div({
  height: '300px',
  width: '94%',
  position: 'relative',
});