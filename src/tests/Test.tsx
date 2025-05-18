"use client";
import { useState } from "react";
import styles from "./Test.module.css";

{
  /*
    This first section has all the type definitons for my test app, to maintain various essentials required to make sense of the test program
  */
}

// Maintaining Weather Description
interface Weather {
  description: string;
  icon: string;
}

// Maintaining Weather Metrics
interface Main {
  temp: number;
  humidity: number;
}

// Maintaining Wind Data
interface Wind {
  speed: number;
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

export default function TestWeather() {
  // Setting Default Location
  const [city, setCity] = useState<string>("Nairobi");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // For Testing Simulation, Populate Accordingly
  const API_KEY = "{OpenWeatherAPI}";

  // Handling City Searching
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Converting Cities to Coordinates
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
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
          <h2>Current Weather in {city}</h2>
          <div className={styles.currentWeather}>
            <label className={styles.formLabel}>Temperature (°C)</label>
            <input
              readOnly
              value={`${weather.current.main.temp}°C`}
              className={styles.weatherInput}
            />
            <label className={styles.formLabel}>Humidity</label>
            <input
              readOnly
              value={`${weather.current.main.humidity}%`}
              className={styles.weatherInput}
            />

            <label className={styles.formLabel}>Wind Speed</label>
            <input
              readOnly
              value={`Wind: ${weather.current.wind.speed} m/s`}
              className={styles.weatherInput}
            />

            <label className={styles.formLabel}>Description</label>
            <input
              readOnly
              value={weather.current.weather[0]?.description}
              className={styles.weatherInput}
            />
          </div>

          <h3 className={styles.heading3}>3-Day Forecast</h3>
          <div className={styles.forecastGrid}>
            {weather.forecast.map((day, index) => (
              <div key={day.dt} className={styles.forecastCard}>
                <div>Day {index + 1}</div>
                <hr></hr>
                <div className={styles.day}>
                  <b>Date:</b>
                  <br></br>
                  {new Date(day.dt * 1000).toLocaleDateString()}
                </div>
                <div className={styles.day}>
                  <b>Temperature:</b>
                  <br></br>
                  {day.main.temp} <b>°C</b>
                </div>
                <div className={styles.day}>
                  <b>Description:</b>
                  <br></br>
                  {day.weather[0]?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
