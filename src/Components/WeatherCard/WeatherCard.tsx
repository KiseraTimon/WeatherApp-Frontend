"use client";

import { Cloud, Droplet, Thermometer, Wind } from "lucide-react";
import { JSX } from "react";

// Parsing Props
function WeatherCard(
  // Type Definition
  props: {
    temp: number;
    humidity: number;
    windspd: number;
    description: string;
    icon: string;
    location: string;
  }
): JSX.Element {
  const { temp, humidity, windspd, description, icon, location } = props;
  return (
    <>
      <div className="card card-image-cover">
        {/* Rendering Card Icon*/}
        <figure className="h-48">
          <img
            src={icon}
            alt={description}
            className="object-cover w-full h-full"
          />
        </figure>

        <div className="card-body">
          {/*Weather Description*/}
          <h2 className="card-header justify-content-around">{description}</h2>

          <p className="text-content2">Current conditions in {location}</p>

          {/* 6. Grid for four metrics */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* 6a. Temperature */}
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-primary" />
              <span>{temp}°C</span>
            </div>
            {/* 6b. Humidity */}
            <div className="flex items-center space-x-2">
              <Droplet className="h-5 w-5 text-primary" />
              <span>{humidity}%</span>
            </div>
            {/* 6c. Wind Speed */}
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-primary" />
              <span>{windspd} m/s</span>
            </div>
            {/* 6d. Repeat description with cloud icon */}
            <div className="flex items-center space-x-2">
              <Cloud className="h-5 w-5 text-primary" />
              <span>{description}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherCard;
