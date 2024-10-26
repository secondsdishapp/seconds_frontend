import '../SignUp/SignUp.css'; // Import your CSS if you have one
import './SignUpForm.css'; // Import your CSS if you have one
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const SignUpForm = ({ setCurrentForm }) => {
  // live site auth context
  const { signUpWithEmail } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // sign up only need email, password, confirm password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      country,
      mobileNumber,
    };
    console.log('Registration Data:', formData);
    // Here you can handle form submission, e.g., send data to your backend
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    signUpWithEmail(email, password);

  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create an Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
      
        {/* email, password, confirm password */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
            <input
              id="email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
            <input
              id="password"
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
            <input
              id="confirmPassword"
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        
        {/* previous form 
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="first-name" className="form-label">
              First Name:
              <input
                id="first-name"
                type="text"
                className="input-field"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="last-name" className="form-label">
              Last Name:
              <input
                id="last-name"
                type="text"
                className="input-field"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
            <input
              id="email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country:
              <input
                id="country"
                type="text"
                className="input-field"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="mobile-number" className="form-label">
              Mobile Number:
              <input
                id="mobile-number"
                type="tel"
                className="input-field"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        */}

        <button type="submit" className="submit-button">Create Account</button>
        
        <h5 className="login-prompt">
          Already have an account?{' '}
          <a href="#" onClick={() => setCurrentForm('login')}>Log In</a>
        </h5>

      </form>
    </div>
  );
};

export default SignUpForm;
