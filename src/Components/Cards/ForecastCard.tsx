"use client";

import { Calendar, Thermometer } from "lucide-react";
import { JSX } from "react";

// Type Definiton
interface ForecastCardProps {
  date: string;
  icon: string;
  temp: number;
}

export default function ForecastCard(props: ForecastCardProps): JSX.Element {
  const { date, icon, temp } = props;

  // Rendering Forecast Card
  return (
    <div className="card card-compact bg-base-100 shadow-md">
      {/* Date*/}
      <div className="card-header flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="card-title text-sm">{date}</h3>
      </div>

      {/* Icon */}
      <figure className="h-20 flex items-center justify-center">
        <img src={icon} alt="weather icon" className="h-full" />
      </figure>

      {/* Temp Footer */}
      <div className="card-footer justify-center">
        <Thermometer className="h-5 w-5 text-primary" />
        <span className="text-lg font-medium">{temp.toFixed(1)}°C</span>
      </div>
    </div>
  );
}
