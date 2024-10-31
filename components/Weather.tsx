"use client";

import React, { useState, useEffect } from "react";
import {
  FaSun,
  FaCloudSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface WeatherData {
  locationKey: string;
  currentConditions: {
    WeatherText: string;
    Temperature: {
      Imperial: {
        Value: number;
        Unit: string;
      };
    };
  };
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather");
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    const intervalId = setInterval(fetchWeather, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getWeatherIcon = (weatherText: string) => {
    const lowerCaseText = weatherText.toLowerCase();
    if (lowerCaseText.includes("sun") || lowerCaseText.includes("clear"))
      return <FaSun className="text-yellow-400" />;
    if (lowerCaseText.includes("cloud") && lowerCaseText.includes("sun"))
      return <FaCloudSun className="text-gray-400" />;
    if (lowerCaseText.includes("cloud"))
      return <FaCloud className="text-gray-400" />;
    if (lowerCaseText.includes("rain"))
      return <FaCloudRain className="text-blue-400" />;
    if (lowerCaseText.includes("snow"))
      return <FaSnowflake className="text-blue-200" />;
    return <FaSun className="text-yellow-400" />;
  };

  if (loading || !weather)
    return <div className="text-gray-300 text-xs sm:text-sm">Loading...</div>;

  const { WeatherText, Temperature } = weather.currentConditions;

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-300">
      <FaMapMarkerAlt className="text-gray-300" />
      <span className="font-medium text-[10px] sm:text-sm">NYC</span>
      {getWeatherIcon(WeatherText)}
      <span>
        {Temperature.Imperial.Value}°{Temperature.Imperial.Unit}
      </span>
    </div>
  );
};

export default Weather;
