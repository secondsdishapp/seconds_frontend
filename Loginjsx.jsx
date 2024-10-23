import React, { useState } from "react";
import './Login.css'; // Import the CSS file for styling
import SignUpForm from '../Components/SignUpForm/SignUpForm'; // Import the RegistrationForm component
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [currentForm, setCurrentForm] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    // Add login logic here
    navigate('/'); // If log in is successful, direct user to Home page.
  }

  return (
    <div className="login-container">
      <div className="header">
        {/* Logo and Menu Icon Removed */}
      </div>
      {currentForm === 'login' ? (
        <div className="login-box">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email"></label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password"></label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
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
        <SignUpForm setCurrentForm={setCurrentForm} /> // Pass setCurrentForm to RegistrationForm
      )}
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
