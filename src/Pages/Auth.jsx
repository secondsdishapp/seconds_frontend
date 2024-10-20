import './Auth.css'; // Import the CSS file for styling
import { useState, useContext } from 'react';
import { LocalAuthContext } from '../Context/LocalAuth/LocalAuthContext.jsx';
import { FaBars } from 'react-icons/fa'; // Import hamburger icon
import Login from '../Components/Auth/Login/Login.jsx';

export default function Auth() {
  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // simulate login process (replace with actual authentication logic)
    alert(`Email: ${email}, Password: ${password}`);
    // add the authentication logic here
  };

  return (
    <div className="login-container">
      <Login />
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
