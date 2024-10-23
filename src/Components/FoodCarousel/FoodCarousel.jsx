// FoodCarousel.jsx
import React from 'react';
import foodImages from './FoodImages'; // Import the dynamically loaded images

const FoodCarousel = () => {
  return (
    <div className="carousel-container">
      <div id="foodCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {foodImages.map((image, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <img src={image} className="d-block w-100" alt={`Food ${index + 1}`} />
            </div>
          ))}
        </div>
        <a className="carousel-control-prev" href="#foodCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#foodCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default FoodCarousel;
