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
import logo from "../assets/logo.png";
import aboutPic from "../assets/about.webp";
import Review from "./Review";
import NAVBAR from "./nav";

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact"); // Replace '/other-page' with the desired URL of the page you want to navigate to
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {/* nav bar */}
      <NAVBAR />
      {/* main section */}
      <div className="aboutMain">
        <h1 className="about">🌾 What Is CropForesight❔ </h1>
        <div className="content">
          <div className="left">
            <p>
              CropForesight is a powerful crop recommendation website that helps
              farmers and agriculture enthusiasts make informed decisions about
              the best crop to cultivate on a given land. By utilizing machine
              learning algorithms and various environmental parameters such as
              nitrogen value of soil, phosphorus value, rainfall, pH, potassium,
              humidity, and temperature. CropForesight predicts the optimal crop
              choice, maximizing productivity and yield.
            </p>

            <ul className="feature">
              <h3>🌾 Salient Features</h3>
              <li>&#9830; Intelligent crop recommendation</li>
              <li>&#9830; User-friendly interface </li>
              <li>
                &#9830;Efficient ML model leveraging Gaussian Naïve Bayes
                algorithm.
              </li>
              <li>
                &#9830; Scalable backend powered by FastAPI for quick data
                processing.
              </li>
            </ul>

            <ul className="feature">
              <h3>🌾 Salient Features</h3>
              <li>&#9830;Intelligent crop recommendation</li>
              <li> &#9830; User-friendly interface </li>
              <li>
                &#9830; Efficient ML model leveraging Gaussian Naïve Bayes
                algorithm.
              </li>
              <li>
                &#9830; Scalable backend powered by FastAPI for quick data
                processing.
              </li>
            </ul>

            <button onClick={handleClick}>Get In Touch</button>
          </div>

          <div className="slider-box">
            {/* <img src={aboutPic} alt="about" /> */}
            <Slider {...settings} className="slider">
              <div className="slider-div">
                <img
                  src={"https://kj1bcdn.b-cdn.net/media/33674/1.jpg?width=1200"}
                  alt="about"
                />
              </div>
              <div className="slider-div">
                <img
                  src={
                    "https://plantix.net/en/library/assets/custom/crop-images/maize.jpeg"
                  }
                  alt="about"
                />
              </div>
              <div className="slider-div">
                <img
                  src={
                    "https://www.agrifarming.in/wp-content/uploads/2022/01/Maize-Yield2-768x576.jpg"
                  }
                  alt="about"
                />
              </div>
              <div className="slider-div">
                <img
                  src={
                    "https://cdn.downtoearth.org.in/library/large/2019-06-03/0.62901000_1559538844_maize_gettyimages-.jpg"
                  }
                  alt="about"
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <div className="details">
        <div className="d-col">
          <div className="img-cont">
            <img
              src="https://crop4sight.com/wp-content/uploads/2022/04/agronomy-icon.png"
              alt=""
            />
          </div>
          <div className="title">
            <h2>Agronomy</h2>
            <p>
              Potato crop management using predictions powered by agronomy.{" "}
            </p>
          </div>
        </div>
        <div className="d-col">
          <div className="img-cont">
            <img
              src="https://crop4sight.com/wp-content/uploads/2022/04/technology-icon.png"
              alt=""
            />
          </div>
          <div className="title">
            <h2>TECHNOLOGY</h2>
            <p>
              Using data science to forecast agronomic and financial crop
              outcomes and automate data collection.{" "}
            </p>
          </div>
        </div>
        <div className="d-col">
          <div className="img-cont">
            <img
              src="https://crop4sight.com/wp-content/uploads/2022/04/valuable-insights-icon.png"
              alt=""
            />
          </div>
          <div className="title">
            <h2>Valuable Insights </h2>
            <p>
              {" "}
              Manage your crop value and supply chain requirements from
              pre-planting to harvest.
            </p>
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
