export interface HourlyData {
  time: Date;
  temp: number;
  description: string;
  icon: string;
  windSpeed: number;
  humidity: number;
  rain: number;
  feelsLike: number;
  tempMin: number; // Daily min temp
  tempMax: number; // Daily max temp
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

