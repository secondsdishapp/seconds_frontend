//FourOFour.jsx
import "./FourOFour.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from 'gsap';
import EmptyPlate1 from '../assets/images/fourofour/empty-plate1.jpg';
import EmptyPlate2 from '../assets/images/fourofour/empty-plate2.jpg';
import EmptyPlate3 from '../assets/images/fourofour/empty-plate3.jpg';
import EmptyPlate5 from '../assets/images/fourofour/empty-plate5.jpg';
import EmptyPlate6 from '../assets/images/fourofour/empty-plate6.jpg';
import EmptyPlate7 from '../assets/images/fourofour/empty-plate7.jpg';
import EmptyPlate8 from '../assets/images/fourofour/empty-plate8.png';
import EmptyPlate9 from '../assets/images/fourofour/empty-plate9.png';

// Array of jokes
const food404Jokes = [
  "404: The only thing on this plate is disappointment… and maybe some crumbs.",
  "Oops! This page is like a chef without a recipe—completely lost!",
  "404 Error: Like a pizza without toppings—just doesn’t make sense!",
  "This page is like a donut without a hole... missing something important!",
  "Sorry, this page is currently out of stock—kind of like my willpower at an all-you-can-eat buffet!",
  "404: The only thing cooking here is disappointment... and maybe some burnt toast!",
  "This page is more elusive than a salad at a barbecue!",
  "404: We can’t find the page, but we can find you a snack!",
  "Oops! This page is as lost as the last cookie in the jar!",
  "404 Error: We tried to find this page, but it must have been deep-fried and gone!",
  "Looks like this page is as empty as my fridge after a midnight snack raid!",
  "404: This page is out for lunch. Please check back after snack time!",
  "This page is on a gluten-free diet: It’s not here!",
  "404: Salad not found. Please check your dressing!",
  "404 Error: The page you’re looking for is like a lost pancake—flipped and gone!",
  "404 Error: This page is like a doughnut without a hole—just not complete!",
  "404 Error: This page is currently on a food adventure... it’ll be back after a slice of life!",
  "404 Error: This page has gone to find a better recipe!"
];

const jokes = [
  "I’m on a seafood diet. I see food, and I eat it.",
  "You can’t make everyone happy. You’re not a taco.",
  "I told my computer I needed a break, and now it won’t stop sending me recipes.",
  "If you can't stand the heat, get out of the kitchen... unless there are snacks.",
  "I cook with wine; sometimes, I even add it to the food.",
  "There’s no we in food.",
  "Life is uncertain. Eat dessert first.",
  "I'm on a strict diet. I only eat cake on days that end with 'y'!",
  "Why did the tomato turn red? Because it saw the salad dressing!",
  "If you think I’m cute, you should see my lunchbox!",
  "I used to be indecisive, but now I'm not so sure... especially about pizza toppings!",
  "I’m just a sandwich looking for my other half... let’s make a hoagie!",
  "Did you hear about the restaurant on the moon? Great food, no atmosphere!",
  "I'm not a vegetarian because I love animals. I'm a vegetarian because I hate plants!",
  "Why don't eggs tell jokes? Because they might crack up!",
  "Cooking is like love; it should be entered into with abandon or not at all—unless it’s a microwave meal!",
  // "Ah, the great paradox of gastronomy: I find myself on a diet, yet I often indulge in elaborate fantasies about desserts that are not merely sweet but existentially profound.",
  // "In a world where one cannot discern the true nature of happiness, may I propose that the tomato blushed not out of modesty, but rather as a statement of profound self-awareness upon witnessing the salad don its dressing?",
  // "One often contemplates the idea of companionship while engaged in the act of consumption; perhaps a sandwich, longing for its other half, seeks not just culinary harmony but a soulmate in the vast sandwich universe.",
  // "Indecision plagues the soul, particularly in the realm of culinary delights. Shall we opt for the pepperoni or the mushroom? Perhaps a hybrid approach is the true essence of pizza philosophy!",
  // "Did you hear about the avant-garde restaurant located on the moon? While its ambiance is decidedly lacking, the cuisine transcends the ordinary, leaving diners to ponder whether they are consuming sustenance or celestial artistry.",
  // "My dietary choices are not a mere reflection of my affection for animals; rather, they arise from a philosophical disdain for flora, which, in its silent existence, threatens my culinary pursuits with untamed greenery.",
  // "One must ask: why do eggs avoid humor? The answer, my friends, lies in their delicate nature; cracking up is not merely a jest, but a catastrophic event in the world of breakfast.",
  // "Ah, happiness, that elusive concept! It seems one cannot achieve it unless one embodies the spirit of a well-topped pizza, embracing all the complexities of life’s toppings—both savory and sweet.",
  // "In the grand theater of cooking, where passion and precision intertwine, one must approach the culinary arts with either reckless abandon or a meticulously crafted microwave meal—each a reflection of one’s approach to life itself.",
  "What do you call fake spaghetti? An impasta!",
  "I followed my heart, and it led me to the fridge!",
  "Running late? Just tell everyone you’re stuck in a jam… a fruit jam!",
  "Why did the cookie go to the doctor? Because it felt crumby!",
  "Why did the grape stop in the middle of the road? It ran out of juice!",
  "I'm just a chef who loves to bake... mostly because I can eat the profits!",
  "I don't need an excuse to eat cake. I just need a fork!",
  "What do you call cheese that isn't yours? Nacho cheese!"
];


export default function FourOFour() {

  const carouselItems = document.querySelectorAll(".four-o-four-carousel-item");

  carouselItems.forEach(item => {
      item.addEventListener("click", function () {
          // Stop carousel and expand item
          stopCarousel(); 
          item.classList.toggle("expanded");
          item.querySelector(".four-o-four-carousel-quote").classList.toggle("expanded");
      });
  });
  
  function stopCarousel() {
      document.getElementById("four-o-four-carousel").style.animationPlayState = "paused";
  }
  
  function closeExpandedJoke() {
      document.querySelector(".expanded").classList.remove("expanded");
      document.querySelector(".expanded .four-o-four-carousel-quote").classList.remove("expanded");
      resumeCarousel();
  }
  
  function resumeCarousel() {
      document.getElementById("four-o-four-carousel").style.animationPlayState = "running";
  }
  
  
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
      rotation += .25; // Adjust rotation speed if necessary
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
      <h3>
      {food404Jokes[Math.floor(Math.random() * food404Jokes.length)]}
      </h3>
      <h3>
        How about heading back to <Link to="/">our homepage</Link> or checking out some <Link to="/dishes">delicious dishes</Link> instead?
      </h3>

      <div id="four-o-four-carousel-container">
            <div id="four-o-four-carousel">
              <figure className="four-o-four-carousel-item">
                <img src={EmptyPlate1} alt="empty plate1" />
                <p className="four-o-four-carousel-quote">{jokes[Math.floor(Math.random() * jokes.length)]}</p>
                <button class="four-o-four-close-btn" onclick="closeExpandedJoke()">Close</button>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src={EmptyPlate2} alt="empty plate2" />
                <p className="four-o-four-carousel-quote">{jokes[Math.floor(Math.random() * jokes.length)]}</p>
                <button class="four-o-four-close-btn" onclick="closeExpandedJoke()">Close</button>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src={EmptyPlate3} alt="empty plate3" />
                <p className="four-o-four-carousel-quote">{jokes[Math.floor(Math.random() * jokes.length)]}</p>
                <button class="four-o-four-close-btn" onclick="closeExpandedJoke()">Close</button>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src={EmptyPlate5} alt="empty plate5" />
                <p className="four-o-four-carousel-quote">{jokes[Math.floor(Math.random() * jokes.length)]}</p>
                <button class="four-o-four-close-btn" onclick="closeExpandedJoke()">Close</button>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src={EmptyPlate6} alt="empty plate6" />
                <p className="four-o-four-carousel-quote">{jokes[Math.floor(Math.random() * jokes.length)]}</p>
                <button class="four-o-four-close-btn" onclick="closeExpandedJoke()">Close</button>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src={EmptyPlate7} alt="empty plate7" />
                <p className="four-o-four-carousel-quote">{jokes[Math.floor(Math.random() * jokes.length)]}</p>
                <button class="four-o-four-close-btn" onclick="closeExpandedJoke()">Close</button>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src={EmptyPlate8} alt="empty plate8" />
                <p className="four-o-four-carousel-quote">{jokes[Math.floor(Math.random() * jokes.length)]}</p>
                <button class="four-o-four-close-btn" onclick="closeExpandedJoke()">Close</button>
              </figure>

              <figure className="four-o-four-carousel-item">
                <img src={EmptyPlate9} alt="empty plate9" />
                <p className="four-o-four-carousel-quote">{jokes[Math.floor(Math.random() * jokes.length)]}</p>
                <button class="four-o-four-close-btn" onclick="closeExpandedJoke()">Close</button>
              </figure>
                
            </div>
      </div>
    </div>
  );
}
