import { HourlyData, HourlyGroupedByDay } from "./interfaces/Data";

export const fetchWeather = async ({
  weather,
  setLoad,
  setHourlyData,
  setErr,
  temp,
}: {
  weather: string;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>,
  setHourlyData: React.Dispatch<React.SetStateAction<HourlyGroupedByDay|undefined>>,
  setErr: React.Dispatch<React.SetStateAction<any>>,
  temp:string,
}) => {

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${weather}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&${temp=="Celcius"?"units=metric":"units=imperial"}`
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