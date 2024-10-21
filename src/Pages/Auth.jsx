import './Auth.css'; // Import the CSS file for styling
import { FaBars } from 'react-icons/fa'; // Import hamburger icon

import DummyAuth from '../Components/Auth/DummyAuth/DummyAuth.jsx';
import Login from '../Components/Auth/Login/Login.jsx';

export default function Auth() {

  return (
    <div className="login-container">
      <DummyAuth />
      {/* <Login /> */}
      <div>
        <p>Take the guess work out of the equation...</p>
      </div>
      <div className="food-images">
        <img src="src/assets/images/chicken-sandwich.webp" alt="Chicken Sandwich" className="food-image" />
        <img src="src/assets/images/pizza.jpeg" alt="Pizza" className="food-image" />
        <img src="src/assets/images/Ramen3.jpeg" alt="Ramen" className="food-image" />
      </div>
      <div>
        <p>Ready to explore?</p>
      </div>
    </div>
  );
}
