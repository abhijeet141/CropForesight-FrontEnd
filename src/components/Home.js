import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import video from '../assets/nature.mp4'
import './Home.css'
import './nav.css'
import  NAVBAR from './nav';
import logo from '../assets/earth.png'
import Contact from './contact'

const Typewriter = ({ sentences, delay }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentSentence = sentences[currentIndex % sentences.length];
    const currentSentenceLength = currentSentence.length;

    if (displayText.length === currentSentenceLength) {
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        setDisplayText('');
      }, delay);
    } else {
      const timer = setTimeout(() => {
        setDisplayText((prevText) => prevText + currentSentence[displayText.length]);
      }, 100); // Adjust the typing speed as per your preference

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentIndex, displayText, sentences, delay]);

  return <span>{displayText}</span>;
};

const Home = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const sentences = [
    'Predict what type of crop🌾 is suitable on your land🌏',
    'Get Better yield by predicting the best crop🌾 for you ',
  ];

  return (
    <div className='main'>

      <video src={video} autoPlay loop muted />
      <NAVBAR/>
      <div className="card glass">

           <div className='content'>
        <h1 className='text purple'>Crop Prediction</h1>
        <p className='para'>
        <Typewriter sentences={sentences} delay={2000} />


          </p>
        </div>
        {showButton && (
          <button className='button-1' onClick={() => navigate("/form")}>Get Started</button>
        )}
      </div>
      <div className='button'>
        <button className='button-1' onClick={() => (navigate("/form"))}>PREDICT YOUR CROP</button>
      </div>
    </div>

  )
}

export default Home