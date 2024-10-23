import React, { useEffect, useState } from 'react';
import foodImagesData from './FoodCarouselImages';
import './FoodCarousel.css';
import { useNavigate } from "react-router-dom";
import RightArrowIcon from '../../assets/images/right-arrow-green.svg';
import LeftArrowIcon from '../../assets/images/left-arrow-green.svg';

const FoodCarousel = () => {
  const navigate = useNavigate();
  const [currIndex, setCurrIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const intervalId = setInterval(slideRight, 4000); // Adjusted to 4000 milliseconds
    return () => clearInterval(intervalId);
  }, [currIndex]);

  const slideRight = () => {
    setFadeClass('fade-out'); // Start fading out
    setTimeout(() => {
      setCurrIndex((prevIndex) => (prevIndex === foodImagesData.length - 1 ? 0 : prevIndex + 1));
      setFadeClass('fade-in'); // Start fading in
    }, 1000); // Adjust this to match the duration of the fade effect
  };

  const slideLeft = () => {
    setCurrIndex((prevIndex) => (prevIndex === 0 ? foodImagesData.length - 1 : prevIndex - 1));
  };

  return (
    <div className="food-carousel-container">
<div className="food-opacity-container">
<p className="food-carousel-text-over">Take the guesswork out of the equation...</p>
  <div className="food-carousel-image-container">
    <img className="food-carousel-image" src={foodImagesData[currIndex].src} alt={foodImagesData[currIndex].alt} />
    <div className="food-button-container">
      <button className="food-carousel-btn" type="button" onClick={slideLeft}>
        <img src={LeftArrowIcon} alt="Left arrow icon" className="left-arrow-icon" />
      </button>
      <button className="food-carousel-btn" type="button" onClick={slideRight}>
        <img src={RightArrowIcon} alt="Right arrow icon" className="right-arrow-icon" />
      </button>
    </div>
  </div>
  <p className="food-carousel-text-under">Ready to explore?</p>
</div>
    </div>
  );
}

export default FoodCarousel;
