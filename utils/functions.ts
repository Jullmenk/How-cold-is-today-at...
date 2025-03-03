import { RefObject } from "react";
import { cityCoords, HourlyData, HourlyGroupedByDay } from "./interfaces/Data";
import mapboxgl from "mapbox-gl";

export const fetchWeather = async ({
  city,
  setLoad,
  setHourlyData,
  setErr,
  setCityCoord,
  temp,
}: {
  city: string;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>,
  setHourlyData: React.Dispatch<React.SetStateAction<HourlyGroupedByDay|undefined>>,
  setErr: React.Dispatch<React.SetStateAction<any>>,
  setCityCoord:React.Dispatch<React.SetStateAction<cityCoords|undefined>>,
  temp:string,
}) => {

try {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&${temp=="Celsius"?"units=metric":"units=imperial"}`
  );
if (!response.ok) {
  if (response.status === 404) {
    const data = await response.json();
    if (data.message && data.message.includes('city not found')) {
      setErr("City not found. Please check the city name.")
      return
    }
  }
  setErr("we apologize, something unexpected happened")
  throw new Error('Failed to fetch weather data');
}
          
const data = await response.json();
const cityCoords = {
  lat: data.city.coord.lat,
  lon: data.city.coord.lon,
};

setCityCoord(cityCoords)

const filteredData: HourlyData[] = data.list.map((item: any) => ({
  time: new Date(item.dt * 1000),
  temp: item.main.temp,
  description: item.weather[0].description,
  icon: item.weather[0].icon,
  windSpeed: item.wind.speed,
  humidity: item.main.humidity,
  rain: item.rain ? item.rain["3h"] : 0,
  feelsLike: Math.round(item.main.feels_like),
  tempMin: Math.round(item.main.temp_min),
  tempMax: Math.round(item.main.temp_max),
}));
    
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
    

Object.keys(hourlyGroupedByDay).forEach((dateKey) => {
  const dailyMin = Math.round(hourlyGroupedByDay[dateKey].details.tempMin);
  const dailyMax = Math.round(hourlyGroupedByDay[dateKey].details.tempMax);
  hourlyGroupedByDay[dateKey].hours = hourlyGroupedByDay[dateKey].hours.map((item,i) => ({
    ...item,
    tempMin: i === 0 ? dailyMin : item.tempMin,
    tempMax: i === 0 ? dailyMax : item.tempMax,
  }));
});
    

const limitedDays = Object.keys(hourlyGroupedByDay)
  .slice(0, 5)
  .reduce((acc: HourlyGroupedByDay, key) => {
    acc[key] = hourlyGroupedByDay[key];
    return acc;
  }, {} as HourlyGroupedByDay);
    

  setHourlyData(limitedDays);
  } catch (err) {
    console.log("****Erro:****")
    console.log(err);
    throw new Error('Fail1ed to fetch weather data');          
  } finally {
      setLoad(false);
  }
};


export const loadMap = ({
  cityCoord,
  city,
  tempUnit,
  mapContainerRef,
  mapRef,
  hourlyGroupedByDay,
}: {
  cityCoord: cityCoords | undefined;
  city: string;
  tempUnit: string;
  mapContainerRef: RefObject<HTMLDivElement | null>; 
  mapRef: RefObject<mapboxgl.Map | null>; 
  hourlyGroupedByDay: HourlyGroupedByDay;
}) => {
  try {
    if (!mapContainerRef.current) return; 

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || ''; 

    const defaultCenter: [number, number] = [12, 50];
    const center: [number, number] = cityCoord
      ? [cityCoord.lon, cityCoord.lat]
      : defaultCenter;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement, 
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: cityCoord ? 10 : 2.2,
    });

    mapRef.current.on('load', () => {
      if (!mapRef.current || !cityCoord) return;

      mapRef.current.addSource('city-point', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [cityCoord.lon, cityCoord.lat],
          },
          properties: {
            hdi: 0.811,
          },
        },
      });

      mapRef.current.addLayer({
        id: 'city-circle',
        type: 'circle',
        source: 'city-point',
        paint: {
          'circle-radius': 20,
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'hdi'],
            0,
            'rgba(0, 0, 0, 0)',
            1,
            '#1f2937',
          ],
          'circle-opacity': 0.7,
        },
      });

      new mapboxgl.Marker()
        .setLngLat([cityCoord.lon, cityCoord.lat])
        .addTo(mapRef.current);
      if (Object.keys(hourlyGroupedByDay).length > 0) {
        const firstDay = Object.keys(hourlyGroupedByDay)[0];
        const tempMax = Math.round(hourlyGroupedByDay[firstDay].details.tempMax);
        const tempMin = Math.round(hourlyGroupedByDay[firstDay].details.tempMin);
        setTimeout(() => {
          if (!mapRef.current) return;
          new mapboxgl.Popup()
            .setLngLat([cityCoord.lon, cityCoord.lat])
            .setHTML(
              `<h3>${city}</h3><p>Max: ${tempMax}°${tempUnit === 'Celsius' ? 'C' : 'F'}</p><p>Min: ${tempMin}°${tempUnit === 'Celsius' ? 'C' : 'F'}</p>`
            )
            .addTo(mapRef.current);
        }, 500);
      }
    });
  } catch (err) {
    console.error('Erro ao carregar o mapa:', err);
  }
};


export const firstLoadIpFound = async () => {
  try {
    const request = await fetch(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IP_FIND}`);
    const jsonResponse = await request.json();

    const userIp = jsonResponse.ip;
    const requestCity = await fetch(`https://ipapi.co/${userIp}/json/`);
    const cityResponse = await requestCity.json();

    return { cityFound: cityResponse.city || "Unknown" };
  } catch (error) {
    console.error("Error fetching IP data:", error);
    return { cityFound: "Unknown" }; 
  }
};