import "./FourOFour.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from 'gsap';

export default function FourOFour() {
  
  useEffect(() => {
    gsap.from(".error-page", { duration: 1, opacity: 0, y: -50 });
    
    const items = document.querySelectorAll(".four-o-four-carousel-item");
    const totalItems = items.length;
    const angle = 360 / totalItems;
    let rotation = 0;
  
    // Apply initial rotation for each item
    items.forEach((item, index) => {
      item.style.transform = `rotateY(${index * angle}deg) translateZ(500px)`;
    });
  
    // Animation loop
    const animate = () => {
      rotation += .5; // Adjust rotation speed if necessary
      items.forEach((item, index) => {
        item.style.transform = `rotateY(${rotation + index * angle}deg) translateZ(500px)`;
      });
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []); 
  
  return (
    <div className="four-o-four-page">
      <h1>404 - Lost Your Appetite?</h1>
      <p>
        Looks like this page is as empty as a fridge before grocery day!
      </p>
      <p>
        How about heading back to <Link to="/">our homepage</Link> or checking out some <Link to="/dishes">delicious dishes</Link> instead?
      </p>

      <div id="four-o-four-carousel-container">
            <div id="four-o-four-carousel">
              <figure className="four-o-four-carousel-item">
                <img src="src/assets/images/fourofour/empty-plate1.jpg" alt="empty plate1" />
                <p className="four-o-four-carousel-quote">I am on a seafood diet. I see food, and I eat it.</p>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src="src/assets/images/fourofour/empty-plate2.jpg" alt="empty plate2" />
                <p className="four-o-four-carousel-quote">Life is uncertain. Eat dessert first.</p>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src="src/assets/images/fourofour/empty-plate3.jpg" alt="empty plate3" />
                <p className="four-o-four-carousel-quote">There is no we in food.</p>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src="src/assets/images/fourofour/empty-plate5.jpg" alt="empty plate5" />
                <p className="four-o-four-carousel-quote">I cook with wine; sometimes, I even add it to the food.</p>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src="src/assets/images/fourofour/empty-plate6.jpg" alt="empty plate6" />
                <p className="four-o-four-carousel-quote">If we are not supposed to eat midnight snacks, why is there even a light in the fridge?</p>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src="src/assets/images/fourofour/empty-plate7.jpg" alt="empty plate7" />
                <p className="four-o-four-carousel-quote">You cannot trust tacos; they always spill the beans.</p>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src="src/assets/images/fourofour/empty-plate8.png" alt="empty plate8" />
                <p className="four-o-four-carousel-quote">My favorite exercise is a cross between a lunge and a crunch—I call it lunch!</p>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src="src/assets/images/fourofour/empty-plate9.png" alt="empty plate9" />
                <p className="four-o-four-carousel-quote">404: The only thing on this plate is disappointment… and maybe some crumbs.</p>
              </figure>
                
            </div>
      </div>
    </div>
  );
}
