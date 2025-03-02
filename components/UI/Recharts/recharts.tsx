import { HourlyGroupedByDay } from '@/utils/interfaces/Data';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface Hourrr {
  hourly:HourlyGroupedByDay|undefined,
  kindof:boolean,
}
export const Recharts: React.FC<Hourrr> = ({ hourly,kindof }) => {
   const timeData = hourly
   ? Object.entries(hourly).map(([date, day]) => ({
       time: `${day.details.dayName} ${day.details.dayNumber}`, 
       temp: Math.round(day.hours[0].temp), 
       tempMin: Math.round(day.details.tempMin), 
       tempMax: Math.round(day.details.tempMax), 
     }))
   : [];
  
  const dayData = hourly
  ? Object.values(hourly)
      .flatMap((day) => day.hours) 
      .map((hour) => ({
        time: hour.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        temp: Math.round(hour.temp),
        tempMin: hour.tempMin,
        tempMax: hour.tempMax,
      }))
  : [];
<XAxis dataKey="time" /> 

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={kindof?timeData:dayData} 
        margin={{
          top: 30,
          right: 30,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft center' }} />
        <Tooltip />
        <Area type="monotone" dataKey="temp" stackId="1" stroke="#8884d8" fill="var(--darkBlue)" />
        <Area type="monotone" dataKey="tempMin" stackId="1" stroke="#82ca9d" fill="var(--dirtyGray)" />
        <Area type="monotone" dataKey="tempMax" stackId="1" stroke="#ffc658" fill="lightblue" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

