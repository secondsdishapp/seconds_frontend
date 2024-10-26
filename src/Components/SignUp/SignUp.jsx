import './SignUp.css';
// SignUp.jsx
import React, { useState } from 'react';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering with:', { firstName, lastName, email, country, mobileNumber });
    // Add registration logic here
  };

    return (
        <div className="signup-container"> {/* Wrap form in a container */}
            <h2 className="signup-title">Sign in or Sign up</h2> {/* Added class for styling */}
            <form onSubmit={handleSubmit} className="signup-form"> {/* Added class for styling */}
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label> {/* Added label for accessibility */}
                    <input
                        type="email"
                        id="email" // Add ID for accessibility
                        className="input-field" // Use CSS class for consistent styling
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label> {/* Added label for accessibility */}
                    {/* <input
                        type="password"
                        id="password" // Add ID for accessibility
                        className="input-field" // Use CSS class for consistent styling
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required 
                    /> */}
                </div>
                <button type="submit" className="submit-button">Sign Up</button> {/* Added class for styling */}
            </form>
            <div className="login-prompt"> {/* Added login prompt */}
                Already have an account? <a href="/login">Log In</a>
            </div>
        </div>
    );
};

export default SignUp;
