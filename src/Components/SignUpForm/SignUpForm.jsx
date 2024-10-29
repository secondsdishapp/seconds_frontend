import './SignUpForm.css'; // Import your CSS if you have one
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { sendNewUserToDb } from '../../Services/users.services.js';
import Login from '../Auth/Login/Login.jsx'

const SignUpForm = ({ setCurrentForm }) => {
  // live site auth context
  const { signUpWithEmail } = useContext(AuthContext);

  // configs
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // sign up only need email, password, confirm password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
   
    // Here you can handle form submission, e.g., send data to your backend
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const newUser = await signUpWithEmail(formEmail, password);
    console.log('New User:', newUser);
    const { uid: firebase_id, email } = newUser.user;
    console.log('New User:', firebase_id);
    sendNewUserToDb({firebase_email: email, firebase_id});
    setFormEmail('')
    setPassword("");
    setConfirmPassword("");
    navigate('/myaccount');
  };

  useEffect(() => {
    if (window.AppleID) {
      window.AppleID.auth.init({
        clientId: 'YOUR_APPLE_CLIENT_ID', // Replace with your client ID from Apple
        scope: 'name email',
        redirectURI: 'YOUR_REDIRECT_URI', // Replace with your redirect URI
        state: 'origin=https://example.com', // Optional state value
        usePopup: true, // Popup mode for sign-in
      });
    }
  }, []);
  return (
    <div className="signup-form-container">
          <h2 className="signup-form-title">Create an Account</h2>
          <form className="signup-form" onSubmit={handleSubmit}>

          <div className="signup-form-group-row">
          <div className="signup-form-group-first-name">
            <label htmlFor="first-name" className="form-label">
              First Name:
              <input
                id="first-name"
                type="text"
                className="signup-form-input-field-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="signup-form-group-last-name">
            <label htmlFor="last-name" className="form-label">
              Last Name:
              <input
                id="last-name"
                type="text"
                className="signup-form-input-field-last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

            <div className="signup-form-group-email">
              <label htmlFor="email" className="form-label">
                Email:
                <input
                  id="email"
                  type="email"
                  className="signup-form-input-field-email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="signup-form-group-password">
              <label htmlFor="password" className="form-label">
                Password:
                <input
                  id="password"
                  type="password"
                  className="signup-form-input-field-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="signup-form-group-confirm-password">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
                <input
                  id="confirmPassword"
                  type="password"
                  className="signup-form-input-field-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
            </div>

          <div className="signup-form-group-row">
          <div className="signup-form-group-country">
            <label htmlFor="country" className="form-label">
              Country:
              <input
                id="country"
                type="text"
                className="signup-form-input-field-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="signup-form-group-mobile">
            <label htmlFor="mobile-number" className="form-label">
              Mobile Number:
              <input
                id="mobile-number"
                type="tel"
                className="signup-form-input-field-mobile"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
      
      <button type="submit" className="signup-form-button">Sign</button>
        
        <h5 className="signup-form-login-prompt">
          Already have an account?{' '}
          <a href="#" onClick={() => setCurrentForm('login')}>Log In</a>
        </h5>

         
          {/* Google Sign-In Button with Animation */}
          <div className="g-signin-btn" onClick={() => window.open('https://google.com', '_blank')}>
              <div className="g-logo"></div>
              <span>Continue with Google</span>
          </div>

          {/* Facebook Sign-In Button */}
          <div className="fb-login-button"
            data-width="340"
            data-size="large"
            data-button-type="continue_with"
            data-layout="default"
            data-auto-logout-link="false"
            data-use-continue-as="true">
          </div>

          {/* Facebook Sign-In Button */}
          <a href="#" className="facebook-btn">
            <svg className="facebook-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0 5.373 0 0 5.405 0 12.073c0 6.045 4.388 11.054 10.125 12.037v-8.531H7.078v-3.506h3.047V9.4c0-3.018 1.792-4.692 4.533-4.692 1.313 0 2.686.235 2.686.235v2.959h-1.513c-1.492 0-1.955.924-1.955 1.872v2.213h3.328l-.532 3.506h-2.796v8.53C19.612 23.127 24 18.118 24 12.073z"/>
            </svg>
            Continue with Facebook
          </a>

          {/* Apple Sign-In Button */}
          <div id="appleid-signin" className="apple-signin-button" data-color="black" data-border="true" data-border-radius="50" data-type="continue" data-mode="center-align" data-width="100%" data-height-property="100%" data-logo-size="medium" data-font="bold"></div>
      </form>
    </div>
  );
};

export default SignUpForm;