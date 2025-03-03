import React, { useEffect, useRef } from "react";
import { loadMap } from "@/utils/functions";
import { cityCoords } from "@/utils/interfaces/Data";
import styled from "styled-components";

const MapBoxPage = ({
  cityCoord,
  city,
  tempUnit,
}: {
  cityCoord: cityCoords|undefined;
  city: string;
  tempUnit: string;
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    loadMap({
      cityCoord, // Passamos as coordenadas da cidade
      city, // Passamos o nome da cidade
      tempUnit, // Passamos a unidade de temperatura
      mapContainer: mapContainer.current, // Passamos a referência atual
      map: map.current, // Passamos o mapa atual
      hourlyGroupedByDay: {}, // Placeholder, substitua pelos dados reais
    });
  }, [city, tempUnit, cityCoord]);

  return <DIV ref={mapContainer} />;
};

export default MapBoxPage;

const DIV = styled.div`
  width: 95%;
  height: 300px;
`;