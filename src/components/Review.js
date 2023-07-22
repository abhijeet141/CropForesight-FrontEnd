import React from "react";
import reviews from "./data";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Review.css";

const Review = () => {
  const items = reviews.map((ele) => {
    return (
      <>
      
      <div className="testimonial" key={ele.id}>
        <div className="img-wrapper">
          <img src={ele.image} alt="img" className="img" />
        </div>
        <p className="designation">{ele.job}</p>
        <p className="description">
          {ele.text}
          <span style={{marginLeft:'12px'}}>
            <img 
              width="20"
              height="15"
              src="https://img.icons8.com/external-zen-filled-royyan-wijaya/24/external-quote-right-communication-zen-filled-royyan-wijaya.png"
              alt="external-quote-right-communication-zen-filled-royyan-wijaya"
            />
          </span>
        </p>
      </div>
      
      
      </>
     
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
        responsive={responsive}
        items={items}
        autoPlay
         autoPlayInterval={5000}
         renderPrevButton={() => {
          return <p className="right_arrow"><img width="48" height="48" src="https://img.icons8.com/color/48/circled-chevron-left--v1.png" alt="circled-chevron-left--v1"/></p>
        }}
        renderNextButton={() => {
          return <p className="left_arrow"><img width="48" height="48" src="https://img.icons8.com/color/48/circled-chevron-right--v1.png" alt="circled-chevron-right--v1"/></p>
        }} 
      />
    </div>
  );
};

export default Review;
