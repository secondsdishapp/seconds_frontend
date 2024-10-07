import React, { useState } from "react";
import './Login.css'; // Import the CSS file for styling
import RegistrationForm from './RegistrationForm'; // Import the RegistrationForm component
import { useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'; // Import hamburger icon

export default function Login() {
  const [currentForm, setCurrentForm] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    // Add login logic here
    navigate('/'); //if log in is successful, direct user to Home page.
  }

  return (
    <div className="login-container">
      <div className="header">
        <img
          src="src/assets/images/seconds-small.png" // Update with your logo path
          alt="Seconds Logo"
          className="logo"
        />
        <img
          src="src/assets/images/menu-icon.png" // Update with your hamburger icon path
          alt="Menu"
          className="menu-icon"
        />
      </div>
      {currentForm === 'login' ? (
        <div className="login-box">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Log In</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="**********"
                id="password"
                name="password"
                className="input-field"
                required
              />
            </div>
            <button type="submit" className="login-button">Log In</button>

            <h5 className="signup-prompt">
              Not Registered?{' '}
              <a href="#" onClick={() => setCurrentForm('register')}>Sign Up</a>
            </h5>
          </form>
        </div>
      ) : (
        <RegistrationForm setCurrentForm={setCurrentForm} /> // Pass setCurrentForm to RegistrationForm
      )}
      <div>
        <p>Take the guest work out of the equation...</p>
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
