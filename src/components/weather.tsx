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

export const weatherData: WeatherData = {
  current: {
    temp: 72,
    feelsLike: 70,
    condition: "Partly Cloudy",
    icon: "⛅",
    humidity: 45,
    wind: 8,
  },
  forecast: [
    { day: "Mon", high: 74, low: 58, condition: "Sunny", icon: "☀️" },
    { day: "Tue", high: 71, low: 55, condition: "Cloudy", icon: "☁️" },
    { day: "Wed", high: 68, low: 52, condition: "Rain", icon: "🌧️" },
    { day: "Thu", high: 75, low: 60, condition: "Sunny", icon: "☀️" },
    { day: "Fri", high: 77, low: 62, condition: "Clear", icon: "🌤️" },
  ],
};

const pillColors = ["#FFE4F0", "#E8DFFF", "#D4F0E8", "#FFF3E0", "#E0F0FF"];

export default function Weather() {
    return (
        <>
          <div className="weather-layout">
            <div className="weather-bubble">
              <span className="weather-icon">{weatherData.current.icon}</span>
              <span className="weather-temp">{weatherData.current.temp}°</span>
              <span className="weather-feels">Feels {weatherData.current.feelsLike}°</span>
            </div>

            <div className="weather-details">
              <div className="weather-detail-row">
                <span className="weather-dot" style={{ background: "#A8D8EA" }} />
                {weatherData.current.condition}
              </div>
              <div className="weather-detail-row">
                <span className="weather-dot" style={{ background: "#7EDAB9" }} />
                Humidity {weatherData.current.humidity}%
              </div>
              <div className="weather-detail-row">
                <span className="weather-dot" style={{ background: "#FFB899" }} />
                Wind {weatherData.current.wind} mph
              </div>
            </div>
          </div>

          <div className="weather-divider">
            <ScallopBorder color="#E8DFFF" />
          </div>

          <div className="forecast-pills">
            {weatherData.forecast.map((f, idx) => {
              const bg = pillColors[idx % pillColors.length];
              return (
                <div
                  key={f.day}
                  className="forecast-pill"
                  style={{
                    background: bg,
                    border: `1.5px solid ${bg}`,
                    boxShadow: `0 2px 8px ${bg}88`,
                  }}
                >
                  <span className="forecast-day">{f.day}</span>
                  <span>{f.icon}</span>
                  <span className="forecast-temp">{f.high}°/{f.low}°</span>
                </div>
              );
            })}
          </div>
        </>
    );
}
