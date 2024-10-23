// FoodCarousel.jsx
import React from 'react';
import foodImagesData from './FoodCarouselImages'; // Ensure the path is correct
import './FoodCarousel.css'; // Import your CSS file

const FoodCarousel = () => {
  return (
    <div className="food-carousel-container">
      <div id="foodCarousel" className="food-carousel slide" data-ride="carousel">
        <div className="food-carousel-inner">
          {foodImagesData.map((image, index) => (
            <div className={`food-carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              {/* Use the dynamic src and alt from the image object */}
              <img src={image.src} className="d-block w-100 food-carousel-image" alt={image.alt} />
            </div>
          ))}
        </div>
        <a className="food-carousel-control-prev" href="#foodCarousel" role="button" data-slide="prev">
          <span className="food-carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="food-carousel-control-next" href="#foodCarousel" role="button" data-slide="next">
          <span className="food-carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default FoodCarousel;
