import React, { useState } from "react";

export default function TemperatureScale(props) {
  const [unit, setUnit] = useState("celsius");

  function convertToFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function convertToCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <span className="TemperatureScale">
        <span className="temperature">{Math.round(props.celsius)}</span>
        <span className="unit">°C</span>
        <span className="unit-switch" onClick={convertToFahrenheit}>
          | °F
        </span>
      </span>
    );
  } else {
    let fahrenheit = (props.celsius * 9) / 5 + 32;
    return (
      <span className="TemperatureScale">
        <span className="temperature">{Math.round(fahrenheit)}</span>
        <span className="unit">°F</span>
        <span className="unit-switch" onClick={convertToCelsius}>
          | °C
        </span>
      </span>
    );
  }
}
