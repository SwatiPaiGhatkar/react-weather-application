import React, { useState, useEffect } from "react";
import "./Forecast.css";
import axios from "axios";

export default function Forecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    setLoaded(false);
    if (props.data && props.data.coordinates) {
      let latitude = props.data.coordinates.lat;
      let longitude = props.data.coordinates.lon;
      let apiKey = "8e9db809de0a11b6df5e9e40be6b345a";
      let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      axios.get(apiUrl).then(handleForecastResponse);
    }
  }, [props.data.coordinates]);

  function handleForecastResponse(response) {
    console.log(response.data);

    // Process the forecast data - OpenWeatherMap returns 40 entries (5 days * 8 times per day)
    // We'll take one forecast per day at 12:00 PM (or closest available)
    const dailyForecasts = [];
    const processedDates = new Set();

    response.data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();

      // Only add one forecast per day, preferring midday forecasts
      if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
        dailyForecasts.push({
          date: date,
          temperature: {
            max: Math.round(item.main.temp_max),
            min: Math.round(item.main.temp_min),
          },
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        });
        processedDates.add(dateString);
      }
    });

    setForecast(dailyForecasts);
    setLoaded(true);
  }

  function formatDay(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  if (loaded) {
    return (
      <div className="Forecast">
        <div className="row">
          {forecast.map((day, index) => (
            <div className="col" key={index}>
              <div className="ForecastDay">
                <div className="ForecastDay-day">{formatDay(day.date)}</div>
                <div className="ForecastDay-icon">
                  <img
                    src={day.iconUrl}
                    alt={day.description}
                    width="42"
                    height="42"
                  />
                </div>
                <div className="Forecast-temperature">
                  <span className="Forecast-temperature-max">
                    <strong>{day.temperature.max}°</strong>
                  </span>
                  <span className="Forecast-temperature-min">
                    {day.temperature.min}°
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="Forecast">
        <div className="row">
          <div className="col-12">
            <p>Loading forecast...</p>
          </div>
        </div>
      </div>
    );
  }
}
