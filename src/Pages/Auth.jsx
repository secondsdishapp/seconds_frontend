import { useState, useContext } from 'react';
import { LocalAuthContext } from '../Context/LocalAuth/LocalAuthContext.jsx';
import { FaBars } from 'react-icons/fa'; // Import hamburger icon
import Login from '../Components/Auth/Login/Login.jsx';
import Modal from '../Components/Modal/Modal.jsx';
import SignUpForm from '../Components/SignUpForm/SignUpForm.jsx';
import ToggleSwitch from '../Components/ToggleSwitch/ToggleSwitch.jsx';

export default function Auth() {
  // context
  const {
    isLocalLoggedIn,
    localUser,
    localLogin,
    localLogout,
    localAuthTest
  } = useContext(LocalAuthContext);

  const [toggleMode, setToggleMode] = useState('signIn');
  
  // state to manage modal open/close
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  //state to manage toggle switches
  const [isSignIn, setIsSignIn] = useState(true);


  //handle the toggle change
  const handleToggle = () => {
    setIsSignIn(prev => !prev); //Toggle between true and flase
};
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // simulate login process (replace with actual authentication logic)
    alert(`Email: ${email}, Password: ${password}`);
    // add the authentication logic here
  };

  return (
    <div className="auth-container">
            {/* ToggleSwitch component for switching between sign in and sign up */}
      <ToggleSwitch 
        isSignIn={isSignIn}     // pass isSignIn to T=toggleSwitch
        onToggle={handleToggle} // pass handleToggle function
      />
      
      {/* <Login /> */}
      {/* Conditionally render Login or SignUpForm based on authMode */}
      {isSignIn ? <Login /> : <SignUpForm />}
      {/* {authMode === 'signIn' ?
        <Login /> : 
        <SignUpForm />
      } */}
      {/* Button to open the modal */}
      {/* <button onClick={() => setIsModalOpen(true)}>Open Modal</button> */}
      
      {/* Modal component with isOpen prop */}
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        
      </Modal> */}
    
    <div className="auth-bottom-container">
    <div className="auth-guess-slogan">
        <p>Take the guess work out of the equation...</p>
      </div>
      <div className="auth-food-images">
        <img src="src/assets/images/chicken-sandwich.webp" alt="Chicken Sandwich" className="food-image" />
        <img src="src/assets/images/pizza.jpeg" alt="Pizza" className="food-image" />
        <img src="src/assets/images/Ramen3.jpeg" alt="Ramen" className="food-image" />
      </div>
      <div className="auth-explore-slogan">
        <p>Ready to explore?</p>
      </div>
      </div>
    </div>
  );
}
