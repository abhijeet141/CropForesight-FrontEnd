import '../HomePage/HomePage.css'
import {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
export function HomePage(){
    const [currentIndex, setCurrentIndex] = useState(0);
        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          beforeChange: (current, next) => setCurrentIndex(next),
        };  
        const images = [
          "https://kj1bcdn.b-cdn.net/media/33674/1.jpg?width=1200",
          "https://plantix.net/en/library/assets/custom/crop-images/maize.jpeg",
          "https://www.agrifarming.in/wp-content/uploads/2022/01/Maize-Yield2-768x576.jpg",
          "https://cdn.downtoearth.org.in/library/large/2019-06-03/0.62901000_1559538844_maize_gettyimages-.jpg",
        ];
        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          }, 3000);
          return () => clearInterval(interval);
        }, []);
    return(
        <div>
            <div>
                <Navbar isHomepage={true}></Navbar>
            </div>
        <div className={`aboutMain`}>
        <h1 className="about">🌾 What Is CropForesight❔ </h1>
        <div className="content">
          <div className="left">
            <p>
             CropForesight provides comprehensive agricultural solutions, helping farmers and agriculture enthusiasts make informed decisions. Our platform offers crop recommendations by analyzing key environmental parameters—such as soil nitrogen and phosphorus levels, rainfall, pH, potassium, humidity, and temperature—to identify the optimal crop for maximum productivity and yield. Additionally, CropForesight features a tomato plant disease classification tool that uses deep learning to detect potential issues from leaf images.
            </p>

            <ul className="feature">
              <h3>🌾 Salient Features</h3>
              <li>&#9830; Intelligent crop recommendation and disease classification</li>
              <li>&#9830; User-friendly interface </li>
              <li>
                &#9830; Efficient ML Model and DL Model
              </li>
              <li>
                &#9830; Scalable backend powered by FastAPI for quick data
                processing.
              </li>
            </ul>

          </div>

          <div className="slider-box">
            <Slider {...settings} className="slider">
              {images.map((image, index) => (
                <div className="slider-div" key={index}>
                  <img src={image} alt="about" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
        </div>
    )
}