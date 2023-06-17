import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import reviews from "./data";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import './Review.css';

const Review = () => {
  const items = reviews.map((ele) => {
    return(
    <div className="testimonial-wrapper">
       <div className="testimonial">
       <div className="img-wrapper">
          <img src={ele.image} alt='img' className="img"/>
         <span className="quote-icon" ><FaQuoteRight/></span>
       </div>
       <p className="designation">{ele.job}</p>
       <p className="description">{ele.text}</p>
     </div>
    </div>
    )
  })

  const responsive = {
    0: { items: 1 },
    512: { items: 1 },
    666: { items: 1 },
    1024: { items: 1 },
    1361: { items: 1 }
};
 

  return (
 

    <>
    <AliceCarousel mouseTracking infinite  disableButtonsControls responsive={responsive}  items={items} autoPlay/>
    </>
  );
};

export default Review;
