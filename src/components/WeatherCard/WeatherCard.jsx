import React,{useEffect, useState} from 'react'
import './weatherCard.css'
import HashLoader from "react-spinners/HashLoader";


const WeatherCard = ({ weatherData }) => {
    let [loading,setLoading] = useState(true);
    let [color,] = useState("#ffffff");

    const override = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",  
        borderColor: "white",
        margin: "0 auto"
      };

    useEffect(()=>{
        setLoading(true)
        if(weatherData){   
            setTimeout(()=>{
                setLoading(false)
            },1000)        
        }
    },[weatherData])

    return (
        <>
        {
            loading ? <HashLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> :  <div className='card'>
          <div className='card-content'>
          <div className='card-left'>
              <div className='card-header-left'>
                  <h2 className='card-city'>{weatherData.name}</h2>
                  <p className='card-date'>{new Date().toLocaleString()}</p>
                  <h3 className='temp'>{(weatherData.main.temp - 273.15).toFixed(2)}°C</h3>
              </div>
          </div>
          <div className='card-right'>
              <img className='icons' src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="icon" />
              <h3 className='des'>{weatherData.weather[0].description}</h3>
          </div>
          </div>
          <p className='feels'>Feels like {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
      </div>
        }
       </>
    )
}

export default WeatherCard