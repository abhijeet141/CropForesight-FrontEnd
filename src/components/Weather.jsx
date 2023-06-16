import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Weather.css'
import './nav.css'
import logo from '../assets/earth.png';

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
            <div className='nav'>
                <header>
                    <nav>
                        <div class="left" style={{ color: "red" }}>
                            <Link to="/"><img src={logo} /></Link>
                        </div>
                        <div class="right">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact" >Contact</Link></li>
                                <li><Link to="/faq" >FAQs</Link></li>
                                <li><Link to="/Weather">Weather</Link></li>

                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
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

                    <p className='name'>{weatherData.name}</p>
                    <p className='dis'>{weatherData.weather[0].description}</p>
                    <p className='temp'>{weatherData.main.temp}</p>
                </div>
            )}
        </div>

    )
}
export default Weather;