import React from "react";
import "./about.css";
import "./nav.css";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from '../assets/earth.webp';
import aboutPic from '../assets/about.webp';
import Review from "./Review";
import NAVBAR from './nav';


const About = () => {
  const navigate = useNavigate();
  
    const handleClick = () => {
        navigate('/contact'); // Replace '/other-page' with the desired URL of the page you want to navigate to
    };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
    return (
        <>
            {/* nav bar */}
            <NAVBAR />
            {/* main section */}
            <div className="aboutMain">
                <h1 className="about"> What Is CropForesight❔ </h1>
                <div className="content">
                    <div className="left">
                        <p>CropForesight is a powerful crop recommendation website that helps farmers and agriculture enthusiasts make informed decisions about the best crop to cultivate on a given land.<br />
                            By utilizing machine learning algorithms and various environmental parameters such as nitrogen value of soil, phosphorus value, rainfall, pH, potassium, humidity, and temperature. CropForesight predicts the optimal crop choice, maximizing productivity and yield.</p>

                        <ul className="feature">
                            <h3>Salient Features</h3>
                            <li>
                                Intelligent crop recommendation</li>
                            <li>
                                User-friendly interface </li>
                            <li>Efficient ML model leveraging Gaussian Naïve Bayes algorithm.</li>
                            <li>
                                Scalable backend powered by FastAPI for quick data processing.</li>
                        </ul>

            <ul className="feature">
              <h3>Salient Features</h3>
              <li>Intelligent crop recommendation</li>
              <li>User-friendly interface </li>
              <li>
                Efficient ML model leveraging Gaussian Naïve Bayes algorithm.
              </li>
              <li>
                Scalable backend powered by FastAPI for quick data processing.
              </li>
            </ul>

            <button onClick={handleClick}>Get In Touch</button>
          </div>
          <div className="slider-box">
            {/* <img src={aboutPic} alt="about" /> */}
            <Slider {...settings} className="slider">
              <div className="slider-div">
                <img src={aboutPic} alt="about" />
              </div>
              <div className="slider-div">
                <img src={image1} alt="about" />
              </div>
              <div className="slider-div">
                <img src={image2} alt="about" />
              </div>
              <div className="slider-div">
                <img src={image3} alt="about" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
      <main>
        <section className="container">
          <div className="title">
            <h2>Our Testimonials</h2>
            <div className="underline"></div>
          </div>
          <Review />
        </section>
      </main>
    </>
  );
};

export default About;
