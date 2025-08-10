import React from "react";
import "./Forecast.css";
import axios from "axios";

export default function Forecast(props) {
  // This component will display the forecast data

  function handleForecastResponse(response) {
    console.log(response.data);
  }
  console.log(props.data);
  let latitude = props.coordinates.lat;
  let longitude = props.coordinates.lon;
  let apiKey = "8e9db809de0a11b6df5e9e40be6b345a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(handleForecastResponse);

  return (
    <div className="Forecast">
      <div className="row">
        <div className="col">
          <div className="ForecastDay-day">Thu</div>
          <div className="ForecastDay-icon">
            <img
              src={props.data.iconUrl}
              alt={props.data.description}
              className="float-left"
            />
          </div>
          <div className="Forecast-temperature">
            <span className="Forecast-temperature-max">
              <strong>19°</strong>{" "}
            </span>
            <span className="Forecast-temperature-min"> 10°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
