import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b96e250f5f9d8682865d4335a802fe2`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Weather</h1>
      <form className="form-h">
        <input
          type="text"
          id="search"
          placeholder="Search By Loaction"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </form>
      <button onClick={handleWeather} className="getWeather">
        SUBMIT
      </button>
      {weatherData && (
        <div className="Weather">
          <p className="name">{weatherData.name}</p>
          <p className="dis">{weatherData.weather.icon}{weatherData.weather[0].description}</p>
          <p className="temp">temp: {weatherData.main.temp}</p>
          <p className="temp_min">min temp: {weatherData.main.temp_min}</p>
          <p className="temp_max">max temp: {weatherData.main.temp_max}</p>
          <p className="humidity">Humidity: {weatherData.main.humidity}</p>
          <p className="wind_speed">wind speed: {weatherData.wind.speed}</p>
        </div>
      )}
    </div>
  );
};
export default Weather;
