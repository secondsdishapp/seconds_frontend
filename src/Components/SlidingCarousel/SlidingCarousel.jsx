import "./SlidingCarousel.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";


export default function SlidingCarousel({ filteredDishSearch, locationsInRadius }) {

    const [ slide, setSlide ] = useState(0);

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
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
        trackTouch: true
    });

    return (
            <div {...swipeHandlers} className="carousel-container">
                <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide}/>
            {filteredDishSearch.map((dish, index) => {
                return (
                    <div key={index} className={slide === index ? "single-card" : "single-card hidden"}>
                        <img className="dish-image" src={dish.dish_image}/>
                        <p className="titles">{dish.dish_name}</p>
                        <p className="titles">{dish.restaurant_name}</p>  
                    </div>
                )
            })}
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