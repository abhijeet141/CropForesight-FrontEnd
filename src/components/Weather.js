import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Weather.css'
import './nav.css'
import logo from '../assets/earth.png';
import NAVBAR from './nav';

export const Weather = () => {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null);

    const handleWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b96e250f5f9d8682865d4335a802fe2`
            );
            setWeatherData(response.data)
        } catch (error) {
            console.error(error)

        }
    }



    return (
        <div>
            <NAVBAR />
            <div class = "maincontainer">
            <h1>Weather</h1>
            <form className="form-h">
                <input
                    type="text"
                    id="search" placeholder="Search By Loaction"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </form>
            <button onClick={handleWeather} className="getWeather">SUBMIT</button>
            {weatherData && (
                <div className='Weather'>
                    <p className="name">{weatherData.name}</p>
                    <img src='https://openweathermap.org/img/wn/.png' alt="" ></img>
                    <p className="dis">{weatherData.weather[0].description}</p>
                    <p className="temp">temp: {weatherData.main.temp}°c</p>
                    <p className="temp_min">min temp:{weatherData.main.temp_min}°c</p>
                    <p className="temp_max">max temp:{weatherData.main.temp_max}°c</p>
                    <p className="humidity">Humidity:{weatherData.main.humidity}%</p>
                    <p className="wind_speed">wind speed:{weatherData.wind.speed}km/h</p>
                </div>
            )}
            </div>
        </div>
    )
}
export default Weather;