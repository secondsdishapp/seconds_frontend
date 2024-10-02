import { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import { FaBars } from 'react-icons/fa'; // Import hamburger icon

export default function Login() {
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
      <div className="login-box">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
          <h5 className="signup-prompt">
            Not Registered? <a href="/register">Sign Up</a>
          </h5>
        </form>
      </div>
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
