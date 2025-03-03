export interface HourlyData {
  time: Date;
  temp: number;
  description: string;
  icon: string;
  windSpeed: number;
  humidity: number;
  rain: number;
  feelsLike: number;
  tempMin: number; 
  tempMax: number; 
}

export interface DailyDetails {
  tempMin: number;
  tempMax: number;
  dayName: string;
  dayNumber: number;
}

export interface HourlyGroupedByDay {
  [date: string]: {
    details: DailyDetails;
    hours: HourlyData[];
  };
}

export interface cityCoords {
  lat:number,
  lon:number,
}
