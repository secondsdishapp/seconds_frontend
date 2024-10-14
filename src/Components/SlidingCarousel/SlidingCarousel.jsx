import "./SlidingCarousel.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import CarouselCard from "./CarouselCard.jsx";

export default function SlidingCarousel({ filteredDishSearch, locationsInRadius }) {

  const [ slide, setSlide ] = useState(0);

  useEffect(() => {
      setSlide(0);
  }, [filteredDishSearch]);

  const nextSlide = () => {
      // setSlide(slide === filteredDishSearch.length-1 ? 0 : slide + 1);
      setSlide((prev) => (prev + 1) % filteredDishSearch.length);
  }

  const prevSlide = () => {
      // setSlide(slide === 0 ? filteredDishSearch.length-1 : slide - 1);
      setSlide((prev) => (prev - 1 + filteredDishSearch.length) % filteredDishSearch.length);
  }

  useEffect(() => {
      console.log(filteredDishSearch, "Sliding Carousel Data");
  }, [filteredDishSearch]);

  const swipeHandlers = useSwipeable({
      onSwipedLeft: (e) => {
          nextSlide();
      },
      onSwipedRight: (e) => {
          prevSlide();
      },
      preventDefaultTouchmoveEvent: true,
      trackMouse: true,
      trackTouch: true,
      delta: 10
  });

  return (
  <div {...swipeHandlers} className="carousel-container" onClick={(e) => e.preventDefault()}>
    <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide}/>
    {filteredDishSearch.map((dish, index) => (
      <CarouselCard key={index} dish={dish} index={index} slide={slide}/>
    ))}
    <BsArrowRightCircleFill className="arrow arrow-right" onClick={nextSlide}/>
    <span className="indicators">
      {filteredDishSearch.map((_, index) => {
        return (
          <button key={index} className={slide === index ? "indicator" : "indicator inactive"} onClick={null}></button>
        )
      })}
    </span>
  </div>
  );
};