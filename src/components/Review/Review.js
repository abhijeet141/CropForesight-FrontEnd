import React, { useState, useEffect } from "react";
import "./Review.css";
import reviews from "../data";

const TestimonialCarousel = ({ mode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000); // Adjust the interval as needed

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className={`carousel-wrapper ${mode === "light" ? "" : "darktet"}`}>
      <div className="carousel-container">
        <div className="testimonial">
          <div className="img-wrapper">
            <img src={reviews[currentIndex].image} alt="img" className="img" />
          </div>
          <p className="designation">{reviews[currentIndex].job}</p>
          <p className="description">
            {reviews[currentIndex].text}
            <span style={{ marginLeft: '12px' }}>
              <img
                width="20"
                height="15"
                src="https://img.icons8.com/external-zen-filled-royyan-wijaya/24/external-quote-right-communication-zen-filled-royyan-wijaya.png"
                alt="external-quote-right-communication-zen-filled-royyan-wijaya"
              />
            </span>
          </p>
        </div>
        <div className="arrows-container">
          <button className="arrow-button prev-button" onClick={prevSlide}>
            &lt;
          </button>
          <button className="arrow-button next-button" onClick={nextSlide}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
