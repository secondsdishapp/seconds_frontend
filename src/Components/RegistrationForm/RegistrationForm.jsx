import React, { useState } from 'react';
import './RegistrationForm.css'; // Import your CSS if you have one

const RegistrationForm = ({ setCurrentForm }) => {
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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mobile Number:
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Register</button>
        <h5>
          Already have an account?{' '}
          <a href="#" onClick={() => setCurrentForm('login')}>Log In</a>
        </h5>
      </form>
    </div>
  );
};

export default RegistrationForm;
