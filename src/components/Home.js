import React from 'react'
import { useNavigate } from 'react-router-dom'
import video from '../assets/nature.mp4'
import './Home.css'
const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='main'>
      <video src={video} autoPlay loop muted />
      <div className='overlay'></div>
      <div className='content'>
        <h1 className='text'>Crop Prediction</h1>
        <p className='para'>Predict what type of crop is suitable on your land</p>
      </div>
      <div className='button'>
        <button className='button-1' onClick={() => (navigate("/form"))}>PREDICT YOUR CROP</button>
      </div>
    </div>
  )
}

export default Home