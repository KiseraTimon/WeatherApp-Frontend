"use client";

import { GetWeatherIcon } from "@/assets/GetWeatherIcon";
import { JSX } from "react";

// Type Definiton
interface ForecastCardProps {
  date: string;
  weatherId: number;
  temp: number;
}

export default function ForecastCard(props: ForecastCardProps): JSX.Element {
  const { date, weatherId, temp } = props;

  // Rendering Forecast Card
  return (
    <div className="card card-compact bg-base-100 shadow-md">
      {/* Date*/}
      <div className="card card-compact bg-base-100 shadow-md justify-start flex">
        <h3 className="card-title text-sm text-orange-500">{date}</h3>
      </div>

      {/* Icon */}
      <figure className="h-20 flex items-center justify-center">
        {GetWeatherIcon(weatherId, {
          className: "h-12 w-12 text-orange-500",
        })}
      </figure>

      {/* Temp Footer */}
      <div className="card card-compact bg-base-100 shadow-md justify-start flex text-orange-500">
        <span className="text-lg font-medium">{temp.toFixed(1)}°C</span>
      </div>
    </div>
  );
}
