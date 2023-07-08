import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import reviews from "./data";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Review.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Review = () => {
  const renderNextButton = ({ isDisabled }) => {
    return <ArrowForwardIosIcon className='slideR' style={{ position: "absolute"}} />
  };
  const renderPrevButton = ({ isDisabled }) => {
    return <ArrowBackIosIcon className='slideL' style={{ position: "absolute" }} />
  };
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
        // renderPrevButton={() => {
        //   return <p className="p-4 absolute right-0 top-0 shifter mb-50">Previous</p>
        // }}
        responsive={responsive}
        items={items}
        autoPlay
        renderPrevButton={renderPrevButton}
          renderNextButton={renderNextButton}
       
        // renderNextButton={() => {
        //   return <i className=" absolute right-0 top-0 Shifter">Next </i>
        // }}
      />
    </div>
  );
};

export default Review;
