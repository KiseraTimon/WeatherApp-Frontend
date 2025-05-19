"use client";

import { Compass, Wind } from "lucide-react";
import { JSX } from "react";

// Type Definition
interface WindCardProps {
  speed: number;
  deg: number;
}

// Helper Function to Determine Wind Vectors
function degToCompass(deg: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
  const idx = Math.round(deg / 45);
  return directions[idx];
}

// Rendering Wind Card
export default function WindCard(props: WindCardProps): JSX.Element {
  const { speed, deg } = props;
  const dir = degToCompass(deg);

  return (
    <div className="card card-compact bg-base-100 shadow-md justify-start">
      {/* Card Title */}
      <div className="justify-start">
        <h3 className="card-title text-lg m-mt-50 text-white-500 text-purple-500">
          Wind
        </h3>
      </div>

      {/* Speed & Direction */}
      <div className="card-body p-4">
        <p className="flex items-center space-x-10">
          <Wind className="h-4 w-4 text-red-500" />
          <span className="text-green-500">
            <strong className="text-red-500">Speed:</strong>
            <br />
            {speed} m/s
          </span>
        </p>
        <p className="flex items-center space-x-10">
          {/* Compass */}
          <Compass className="h-4 w-4 text-yellow-500" />
          <span className="text-pink-500">
            <strong className="text-yellow-500">Direction:</strong>
            <br />
            {dir} ({deg}°)
          </span>
        </p>
      </div>
    </div>
  );
}
