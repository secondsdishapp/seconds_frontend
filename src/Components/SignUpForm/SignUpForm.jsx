import React, { useState } from 'react';
import './SignUpForm.css'; // Import your CSS if you have one

const SignUpForm = ({ setCurrentForm }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = (e) => {
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
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create an Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
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
