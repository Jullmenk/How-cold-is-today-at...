import { cityCoords, HourlyData, HourlyGroupedByDay } from "./interfaces/Data";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY

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
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&${temp=="Celcius"?"units=metric":"units=imperial"}`
          );

          if (!response.ok) {
            if (response.status === 404) {
              const data = await response.json();
              if (data.message && data.message.includes('city not found')) {
                setErr("City not found. Please check the city name.")
                throw new Error('City not found. Please check the city name.');
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
          console.log(err);
          throw new Error('Failed to fetch weather data');          
        } finally {
            setLoad(false);
        }
      };

      
export const loadMap = ({
  cityCoord,
  city,
  tempUnit,
  mapContainer,
  map,
  hourlyGroupedByDay,
}: {
  cityCoord: cityCoords|undefined;
  city: string;
  tempUnit: string;
  mapContainer: HTMLDivElement | null;
  map: mapboxgl.Map | null;
  hourlyGroupedByDay: HourlyGroupedByDay; // Adicione os dados reais aqui
}) => {

  try {
    if (mapContainer && !map && cityCoord) {
      const newMap = new mapboxgl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [cityCoord.lon, cityCoord.lat], // Centraliza na cidade
        zoom: 10, // Zoom inicial
      });

      newMap.on("load", () => {
        // Adicionar marcador na cidade
        new mapboxgl.Marker()
          .setLngLat([cityCoord.lon, cityCoord.lat])
          .addTo(newMap);

        // Adicionar texto com temperatura máxima e mínima (se houver dados)
        if (Object.keys(hourlyGroupedByDay).length > 0) {
          const firstDay = Object.keys(hourlyGroupedByDay)[0];
          const tempMax = hourlyGroupedByDay[firstDay].details.tempMax;
          const tempMin = hourlyGroupedByDay[firstDay].details.tempMin;

          new mapboxgl.Popup()
            .setLngLat([cityCoord.lon, cityCoord.lat])
            .setHTML(
              `<h3>${city}</h3><p>Max: ${tempMax}°${tempUnit === "Celsius" ? "C" : "F"}</p><p>Min: ${tempMin}°${tempUnit === "Celsius" ? "C" : "F"}</p>`
            )
            .addTo(newMap);
        } else {
          console.warn("Nenhum dado de temperatura disponível.");
        }
      });
    }
  } catch (err) {
    console.error("Erro ao carregar o mapa:", err);
  }
};


export const firstLoadIpFound = async () => {
  try {
    const request = await fetch(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IP_FIND}`);
    const jsonResponse = await request.json();
    console.log("IP Info:", jsonResponse);

    const userIp = jsonResponse.ip;
    const requestCity = await fetch(`https://ipapi.co/${userIp}/json/`);
    const cityResponse = await requestCity.json();

    return { cityFound: cityResponse.city || "Unknown" }; // Always return an object
  } catch (error) {
    console.error("Error fetching IP data:", error);
    return { cityFound: "Unknown" }; // Fallback value
  }
};