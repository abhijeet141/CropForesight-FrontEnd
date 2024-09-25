import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plant from '../../assets/plant.jpg'
import plant2 from '../../assets/plant2.jpg'
import "./Home.css";

const Typewriter = ({ sentences, delay }) => {
  
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentSentence = sentences[currentIndex % sentences.length];
    const currentSentenceLength = currentSentence.length;

    if (displayText.length === currentSentenceLength) {
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        setDisplayText("");
      }, delay);
    } else {
      const timer = setTimeout(() => {
        setDisplayText(
          (prevText) => prevText + currentSentence[displayText.length]
        );
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentIndex, displayText, sentences, delay]);

  return <span>{displayText}</span>;
};

const Home = () => {
  const navigate = useNavigate();
  
  const sentences1 = [
    "Predict what type of crop🌾 is suitable on your land🌏",
    "Get Better yield by predicting the best crop🌾 for you.",
  ];
  
  const sentences2 = [
    "Identify diseases on your tomato plants with precision.",
    "Enhance your harvest by detecting tomato plant diseases early.",
  ];

  return (
    <>
      <div className="main">
      <div className="container">
      <div className={`card glass "bg-light1"`}>
        <img src={plant} style={{height:"300px", width:"500px", marginTop: -15}} alt="" />
          <button className={`button-1 "text-black"`} onClick={() => navigate("/form")}>
            PREDICT YOUR CROP
          </button>
          <p className={`para`}>
            <Typewriter sentences={sentences1} delay={2000} />
          </p>
        </div>
        <div className={`card glass "bg-light1"`}>
        <img src={plant2} style={{height:"300px", width:"500px",marginTop:-15}} alt="" />
          <button className={`button-1 "text-black"`} onClick={() => navigate("/ImageUpload")}>
            Classify Tomato Leaf Disease
          </button>
          <p className={`para`}>
            <Typewriter sentences={sentences2} delay={2000} />
          </p>
        </div>
      </div>
      </div>
  </>
  );
};

export default Home;
