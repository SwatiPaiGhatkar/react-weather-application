import React from "react";

export default function FormattedDate(props) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[props.date.getDay()];
  let hours = props.date.getHours();
  let minutes = props.date.getMinutes();
  if (hours < 10) {
    return (
      <div>
        {days}, 0{hours}:{minutes}
      </div>
    );
  }
  if (minutes < 10) {
    return (
      <div>
        {day}, {hours}:0{minutes}
      </div>
    );
  }
  return (
    <div>
      {day}, {hours}:{minutes}
    </div>
  );
}
