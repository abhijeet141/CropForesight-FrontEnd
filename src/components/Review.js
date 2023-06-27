import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import reviews from "./data";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Review.css";

const Review = () => {
  const items = reviews.map((ele) => {
    return (
      <div className="testimonial" key={ele.id}>
        <div className="img-wrapper">
          <img src={ele.image} alt="img" className="img" />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <p className="designation">{ele.job}</p>
        <p className="description">{ele.text}</p>
      </div>
    );
  });

  const responsive = {
    0: { items: 1 },
    512: { items: 1 },
    768: { items: 1 },
    1024: { items: 1 },
    1200: { items: 1 },
  };

  return (
    <div className="carousel-wrapper">
      <AliceCarousel
        mouseTracking
        infinite
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Review;
