"use client";

import React from "react";

// Type Defs
interface NavBarProps {
  city: string;
  loading: boolean;
  onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function NavBar({
  city,
  loading,
  onCityChange,
  onSubmit,
}: NavBarProps) {
  return (
    <>
      {/* <div className="navbar navbar-sticky">
        <div className="navbar-start">
          <a className="navbar-item">Raincheck</a>
        </div>
        <div className="navbar-end">
          <a className="navbar-item">Home</a>
        </div>
      </div> */}

      <div className="navbar navbar-sticky bg-base-200 px-4">
        {/* Left brand */}
        <div className="navbar-start">
          <a className="navbar-item text-xl font-bold">Raincheck</a>
        </div>

        {/* Center search form */}
        <div className="navbar-center">
          <form onSubmit={onSubmit} className="flex space-x-2">
            <input
              type="text"
              value={city}
              onChange={onCityChange}
              placeholder="Search city..."
              className="input input-sm input-bordered"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-sm"
            >
              {loading ? "Wait" : "Submit"}
            </button>
          </form>
        </div>

        {/* Right nav links */}
        <div className="navbar-end">
          <a className="navbar-item">Download Report</a>
        </div>
      </div>
    </>
  );
}
