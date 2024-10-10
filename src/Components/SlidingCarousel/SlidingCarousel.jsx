import "./SlidingCarousel.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";


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

    function dishRating(rating) {
        let arrRating = rating.split(".");
        let firstIndex = arrRating[0];
        let ratingIcons = [];

        for (let i = 1; i <= firstIndex; i++) {
            ratingIcons.push("full");
        }

        if  (Number(arrRating[1]) !== 0) {
            if (Number(arrRating[1]) <= 50) {
                ratingIcons.push("half")
            } else if (Number(arrRating[1]) > 50) {
                ratingIcons.push("full")
            }
        }
        return ratingIcons;
    }

    return (
            <div {...swipeHandlers} className="carousel-container" onClick={(e) => e.preventDefault()}>
                <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide}/>
            {filteredDishSearch.map((dish, index) => {
                return (
                    <div key={index} className={slide === index ? "single-card" : "single-card hidden"}>
                            <div style={{display: "flex", marginLeft: "60%", alignItems: "center", width: "100%"}}>
                                {dishRating(dish.avg_rating).map((elem, index) => elem === "full" ? <img className="rate-icon" src="/eat.png"/> : <img className="rate-icon" src="/eat-half.png"/>)}
                            </div>
                        <img className="dish-image" src={dish.dish_image} onClick={(e) => e.preventDefault()}/>
                        <div className="type-icon-rating-container" >
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "40px"}}>
                                {dish.vegetarian ? <img className="food-type-icon" src="/vegan.svg"/> : null} 
                                {dish.gluten_free ? <img className="food-type-icon2" src="/gluten-free.svg"/> : null}
                            </div>
                        </div>
                        <p className="titles">"{dish.dish_name}"</p>
                        <div className="rest-icon-name-container">
                            <img className="rest-icon" src="/restaurant.svg" />
                            <p className="title-restaurant">{dish.restaurant_name}</p>  
                        </div>
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