"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";

const AUTO_REFRESH_START_HOUR = 7;  // 7 AM
const AUTO_REFRESH_END_HOUR = 21;   // 9 PM
const REFETCH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

function useWeatherRefetchInterval(): number | false {
  const [interval, setInterval_] = useState<number | false>(() => {
    const hour = new Date().getHours();
    return hour >= AUTO_REFRESH_START_HOUR && hour < AUTO_REFRESH_END_HOUR
      ? REFETCH_INTERVAL_MS
      : false;
  });

  useEffect(() => {
    const check = setInterval(() => {
      const hour = new Date().getHours();
      const shouldRefetch =
        hour >= AUTO_REFRESH_START_HOUR && hour < AUTO_REFRESH_END_HOUR;
      setInterval_(shouldRefetch ? REFETCH_INTERVAL_MS : false);
    }, 60 * 1000); // re-evaluate every minute
    return () => clearInterval(check);
  }, []);

  return interval;
}

export interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    icon: string;
    humidity: number;
    wind: number;
  };
  forecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }[];
}

function ScallopBorder({ color = "#FFE4F0" }: { color?: string }) {
  return (
    <svg width="100%" height="12" viewBox="0 0 400 12" preserveAspectRatio="none">
      <path
        d="M0 12 Q10 0 20 12 Q30 0 40 12 Q50 0 60 12 Q70 0 80 12 Q90 0 100 12 Q110 0 120 12 Q130 0 140 12 Q150 0 160 12 Q170 0 180 12 Q190 0 200 12 Q210 0 220 12 Q230 0 240 12 Q250 0 260 12 Q270 0 280 12 Q290 0 300 12 Q310 0 320 12 Q330 0 340 12 Q350 0 360 12 Q370 0 380 12 Q390 0 400 12"
        fill={color}
      />
    </svg>
  );
}

const pillColors = ["#FFE4F0", "#E8DFFF", "#D4F0E8", "#FFF3E0", "#E0F0FF"];

export default function Weather() {
    const refetchInterval = useWeatherRefetchInterval();
    const { data: currentWeather, isLoading: isLoadingCurrent, error: currentError } = api.weather.current.useQuery(undefined, { refetchInterval });
    const { data: forecastData, isLoading: isLoadingForecast, error: forecastError } = api.weather.forecast.useQuery(undefined, { refetchInterval });

    if (isLoadingCurrent || isLoadingForecast) {
      return (
        <div className="weather-layout">
          <div className="weather-bubble">
            <span className="weather-temp">Loading...</span>
          </div>
        </div>
      );
    }

    if (currentError || forecastError) {
      return (
        <div className="weather-layout">
          <div className="weather-bubble">
            <span className="weather-temp">Error loading weather</span>
          </div>
        </div>
      );
    }

    if (!currentWeather || !forecastData) {
      return null;
    }

    // Helper function to format day name from date string
    const getDayName = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    // Helper function to get the most common weather condition emoji
    const getWeatherEmoji = (conditions: string[]) => {
      if (!conditions || conditions.length === 0) return '☀️';
      const condition = conditions[0].toLowerCase();
      if (condition.includes('rain')) return '🌧️';
      if (condition.includes('cloud')) return '☁️';
      if (condition.includes('clear')) return '☀️';
      if (condition.includes('snow')) return '❄️';
      if (condition.includes('thunder')) return '⛈️';
      return '🌤️';
    };

    return (
        <>
          <div className="weather-layout">
            <div className="weather-bubble">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.weatherIcon}@2x.png`}
                alt={currentWeather.weatherDescription}
                className="weather-icon"
              />
              <span className="weather-temp">{Math.round(currentWeather.temp)}°</span>
              <span className="weather-feels">Feels {Math.round(currentWeather.feelsLike)}°</span>
            </div>

            <div className="weather-details">
              <div className="weather-detail-row">
                <span className="weather-dot" style={{ background: "#A8D8EA" }} />
                {currentWeather.weatherDescription}
              </div>
              <div className="weather-detail-row">
                <span className="weather-dot" style={{ background: "#7EDAB9" }} />
                Humidity {currentWeather.humidity}%
              </div>
              <div className="weather-detail-row">
                <span className="weather-dot" style={{ background: "#FFB899" }} />
                Wind {Math.round(currentWeather.windSpeed)} kph
              </div>
            </div>
          </div>

          <div className="weather-divider">
            <ScallopBorder color="#E8DFFF" />
          </div>

          <div className="forecast-pills">
            {forecastData.forecast.map((f, idx) => {
              const bg = pillColors[idx % pillColors.length];
              return (
                <div
                  key={f.id}
                  className="forecast-pill"
                  style={{
                    background: bg,
                    border: `1.5px solid ${bg}`,
                    boxShadow: `0 2px 8px ${bg}88`,
                  }}
                >
                  <span className="forecast-day">{getDayName(f.forecastDate)}</span>
                  <span>{getWeatherEmoji(f.conditions)}</span>
                  <span className="forecast-temp">{Math.round(f.tempMax)}°/{Math.round(f.tempMin)}°</span>
                </div>
              );
            })}
          </div>
        </>
    );
}
