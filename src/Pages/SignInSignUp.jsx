// SignInSignUp.jsx
import React from 'react';
import './SignInSignUp.css';
import SignIn from '../Components/SignIn/SignIn'; // Updated import path
import SignUp from '../Components/SignUp/SignUp'; // Updated import path

// SignInSignUp component takes props: currentForm, toggleForm, and setShowModal
const SignInSignUp = ({ currentForm, toggleForm, setShowModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* close button for the modal */}
        <span 
            className="close" 
            onClick={() => setShowModal(false)} 
            role="button" 
            aria-label="Close modal" 
            tabIndex={0} 
            onKeyPress={(e) => e.key === 'Enter' && setShowModal(false)} // Allow closing with Enter key
            >&times;
         </span>



        {/* toggle buttons for switching between the Sign In and Sign Up forms */}
        <div className="form-toggle">
          <button
            className={currentForm === 'signIn' ? 'active' : ''} // adds an 'active' class when the sign-in form is active
            onClick={() => toggleForm()} // toggles between sign-in and sign-up forms
          >
            {/* the button text will change depending on the current form */}
            {currentForm === 'signIn' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        {/* conditionally rendering the SignIn or SignUp component based on the value of currentForm */}
        {currentForm === 'signIn' ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default SignInSignUp;





