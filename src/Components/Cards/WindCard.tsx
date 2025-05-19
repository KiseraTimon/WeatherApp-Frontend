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
    <div className="card card-compact bg-base-100 shadow-md">
      {/* Card Title */}
      <div className="card-header flex items-center space-x-2">
        <Wind className="h-5 w-5 text-primary" />
        <h3 className="card-title text-sm">Wind</h3>
      </div>

      {/* Speed & Direction */}
      <div className="card-body p-4 space-y-2">
        <p className="flex items-center space-x-2">
          <Wind className="h-4 w-4" />
          <span>
            <strong>Speed:</strong> {speed} m/s
          </span>
        </p>
        <p className="flex items-center space-x-2">
          {/* Compass */}
          <Compass className="h-4 w-4" />
          <span>
            <strong>Direction:</strong> {dir} ({deg}°)
          </span>
        </p>
      </div>
    </div>
  );
}
