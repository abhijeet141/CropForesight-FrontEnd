import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/earth.png';
import menu from '../assets/menu-icon.png';
import './Weather.css';
import './nav.css';

export const Weather = () => {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

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
        <div style={{ position: "relative" }}>
            <nav>
                <div>
                    <Link to="/"><img src={logo} /></Link>
                </div>
                <div className='visibility-desktop'>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact" >Contact</Link></li>
                        <li><Link to="/faq" >FAQs</Link></li>
                        <li><Link to="/Weather">Weather</Link></li>
                    </ul>
                </div>
                <div className='visibility-mobile' onClick={() => setShowMenu((prev) => !prev)}>
                    <img src={menu} alt="" />
                </div>
            </nav>
            {showMenu && (
                <>
                    <div className='mobile-nav'>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact" >Contact</Link></li>
                            <li><Link to="/faq" >FAQs</Link></li>
                            <li><Link to="/Weather">Weather</Link></li>
                        </ul>
                    </div>
                </>
            )}

            <div className='weather-container'>
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
        </div>

    )
}
export default Weather;