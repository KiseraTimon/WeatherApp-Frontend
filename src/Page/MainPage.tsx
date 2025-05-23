"use client";
import ForecastCard from "@/Components/Cards/ForecastCard";
import HumidityCard from "@/Components/Cards/HumidityCard";
import WindCard from "@/Components/Cards/WindCard";
import NavBar from "@/Components/NavBar/NavBar";
import styles from "@/tests/Test.module.css";
import { handleError } from "@/utils/clientlogger";
import { useState } from "react";

{
  /*
    This first section has all the type definitons for my test app, to maintain various essentials required to make sense of the test program
  */
}

// Maintaining Weather Description
interface Weather {
  description: string;
  id: number;
}

// Maintaining Weather Metrics
interface Main {
  temp: number;
  humidity: number;
}

// Maintaining Wind Data
interface Wind {
  speed: number;
  deg: number;
}

// Maintaining Individual Forecast Entries
interface ForecastEntry {
  dt: number;
  main: Main;
  weather: Weather[];
  wind: Wind;
}

// Maintaining Full API Response
interface WeatherApiResponse {
  list: ForecastEntry[];
}

// Maintaining Processed Data
interface WeatherData {
  current: ForecastEntry;
  forecast: ForecastEntry[];
}

{
  /*
        This second section is where the actual data processing takes place.
        I am communicating to the OpenWeather resource through the API.
        I can then retrieve tangible data to populate my demo user interface
    */
}

export default function MainPage() {
  // Setting Default Location
  const [city, setCity] = useState<string>("Nairobi");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Backend Endpoint
  {
    /*
      const LARAVEL_CONNECTOR =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8989/api";
    */
  }

  // Handling City Searching
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Retrieving Coordinates Via Laravel Connection
      {
        /*
          const geoRes = await fetch(`${LARAVEL_CONNECTOR}/geocode?city=${city}`);
        */
      }

      // Logging Response Status
      {
        /*
          console.log("Geocode API Response Status:", geoRes.status);
          console.log("Geocode API Response Headers:", geoRes.headers);
        */
      }

      // Validating Location Existence
      {
        /*
          if (!geoRes.ok) {
            const text = await geoRes.text();
            console.error("Geocode failed:\n", geoRes.status, text);
            throw new Error(`An error occured fetching ${city}`);
          }

          const geoData = await geoRes.json();
          if (!Array.isArray(geoData) || geoData.length === 0) {
            throw new Error(`${city} not found`);
          }
        */
      }

      // Retrieving Refined Weather Data Through Backend
      {
        /*
          const { lat, lon } = geoData[0];
          const weatherRes = await fetch(
            `${LARAVEL_CONNECTOR}/weather?lat=${lat}&lon=${lon}`
          );
        */
      }

      // Validating The Extraction Success
      {
        /*
          if (!weatherRes.ok) throw new Error("Weather Data Unavailable");
          const data: WeatherApiResponse = await weatherRes.json();
        */
      }

      // Converting Cities to Coordinates
      const API_URL = process.env.NEXT_PUBLIC_TEMP_URL;
      const API_KEY = process.env.NEXT_PUBLIC_TEMP_API;
      const geoRes = await fetch(`${API_URL}=${city}&limit=1&appid=${API_KEY}`);
      const geoData: unknown[] = await geoRes.json();

      // Validating Whether Location Exists
      if (!Array.isArray(geoData) || geoData.length === 0) {
        throw new Error("City not found");
      }

      // Extracting Coordinates (1st Result)
      const { lat, lon } = geoData[0] as { lat: number; lon: number };

      // Retrieving Weather Data
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data: WeatherApiResponse = await weatherRes.json();

      // Processing & Storing Weather Data
      setWeather({
        current: data.list[0],
        forecast: data.list.filter((_, i) => i % 8 === 0).slice(0, 3),
      });
    } catch (err) {
      // Error Handling
      setError(err instanceof Error ? err.message : "Failed to fetch weather");

      // Logging Error
      handleError(new Error(String(err)));
    } finally {
      //Terminating Loading State
      setLoading(false);
    }
  };

  {
    /*
        In this final section, I am rendering my user Interface.
        With my data already processed, it's all a matter of populating certain parts.
        I have used vanilla CSS for basic styling of my test application
    */
  }

  // Rendering UI
  return (
    <>
      <NavBar
        city={city}
        loading={loading}
        onCityChange={(e) => setCity(e.target.value)}
        onSubmit={handleSubmit}
      />

      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className={styles.input}
          />
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Fetching..." : "Get Weather"}
          </button>
        </form>

        {error && <div className={styles.error}>{error}</div>}

        {weather && (
          <div className={styles.heading2}>
            <h2>
              Current Weather in <b>{city}</b>
            </h2>

            {/* Weather Cards */}
            {weather && (
              <>
                {/* Row 1: Forecast */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  {weather.forecast.map((day) => (
                    <ForecastCard
                      key={day.dt}
                      date={new Date(day.dt * 1000).toLocaleDateString()}
                      weatherId={day.weather[0].id}
                      temp={day.main.temp}
                    />
                  ))}
                </div>

                {/* Row 2: Current Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <WindCard
                    speed={weather.current.wind.speed}
                    deg={weather.current.wind.deg}
                  />
                  <HumidityCard humidity={weather.current.main.humidity} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
