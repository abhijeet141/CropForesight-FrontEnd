import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index, setIndex] = useState(0);
  const {name, job, image, text} = people[index];

  const checkNumber = (number) => {
    if(number > people.length - 1) {
      return 0;
    }
    if(number < 0) {
      return people.length - 1;
    }
    return number;
  }

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    }) 
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    }) 
  };

  return <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img"/>
        <span className="quote-icon"><FaQuoteRight/></span>
      </div>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <span className="prev-btn" onClick={prevPerson}><FaChevronLeft/></span>
        <span className="next-btn" onClick={nextPerson}><FaChevronRight/></span>
      </div>
     </article>;
};

export default Review;