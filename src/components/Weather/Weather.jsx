import React,{useState} from 'react'
import axios from 'axios'
import './Weather.css'

export const Weather = ({mode,setmode}) => {
    const [city,setCity] = useState('')
    const[weatherData,setWeatherData] = useState(null);

    const handleWeather = async () =>{
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b96e250f5f9d8682865d4335a802fe2`
            );
            setWeatherData(response.data)
        }catch(error){
            console.error(error)

        }
    }



  return (
    <div>
        <h1>Weather</h1>
        <form className="form-h">
        <input
        type="text"
        id="search" placeholder="Search By Loaction"
        value = {city}
        onChange={(e) => setCity(e.target.value)}
        />
        </form>
         <button onClick={handleWeather} className="getWeather">SUBMIT</button>
         {weatherData &&(
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