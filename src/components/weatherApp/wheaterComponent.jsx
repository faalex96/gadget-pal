import { useState, useEffect } from "react";
import { icons } from "../../assets/images/index.js";
import "./weatherApp.css";

export default function WheatherComponent(props) {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [err, setErr] = useState("");

  // Function gets users device coordintes
  const getCoordinates = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let { latitude, longitude } = position.coords;
        setLat(latitude);
        setLong(longitude);
      });
    }
  };

  // Function sends request with latitude and longitude embeded in url
  const getData = async () => {
    if (lat && long) {
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=860ef7c32f0410f859bac7c2cde5f495`;
      let response;
      let result;
      try {
        response = await fetch(apiUrl);
        result = await response.json();
        setWeatherData(result);
      } catch (err) {
        setErr("There was a problem.");
      }
    }
  };

  // get coordinates
  useEffect(() => {
    getCoordinates();
  }, []);

  // look for changes in lat and long and get data
  useEffect(() => {
    getData();
  }, [lat, long]);

  // When data is not null will return div with info
  return (
    <div>
      {weatherData ? (
        <div className="weather-info">
          <p>Weather: {weatherData.weather[0]["description"]}</p>
          <p>Current Temperature: {weatherData.main.temp} &deg;C</p>
          <p>But feels like: {weatherData.main.feels_like} &deg;C</p>
          <p>Wind speed: {weatherData.wind.speed} m/s</p>
          <img
            src={icons[`${weatherData.weather[0]["icon"]}`]}
            alt={weatherData.weather[0]["description"]}
          />
        </div>
      ) : (
        <div className="error-msg">
          <p>{err}</p>
        </div>
      )}
    </div>
  );
}
