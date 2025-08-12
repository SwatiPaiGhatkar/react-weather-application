import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";
import Forecast from "./Forecast";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  useEffect(() => {
    searchCity(city);
    // eslint-disable-next-line
  }, []);

  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      precipitation: response.data.clouds.all,
      icon: response.data.weather[0].icon,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      coordinates: {
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
      },
    });
  }
  function searchCity(city) {
    const apiKey = "8e9db809de0a11b6df5e9e40be6b345a";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function searchByCoordinates(lat, lon) {
    const apiKey = "8e9db809de0a11b6df5e9e40be6b345a";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          searchByCoordinates(lat, lon);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your current location. Please search for a city instead."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchCity(city);
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-7">
              <input
                type="search"
                placeholder="Enter a city.."
                required
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
            <div className="col-2">
              <button
                type="button"
                onClick={handleCurrentLocation}
                className="btn btn-success w-100"
                title="Use current location"
              >
                📍
              </button>
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <Forecast data={weatherData} />
      </div>
    );
  } else {
    searchCity(city);
    return (
      <div className="Weather">
        <h1>Loading...</h1>
      </div>
    );
  }
}
