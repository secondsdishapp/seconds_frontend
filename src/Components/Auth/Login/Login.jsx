import './Login.css'; 
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LocalAuthContext } from '../../../Context/LocalAuth/LocalAuthContext.jsx';
import { AuthContext } from '../../../Context/AuthContext/AuthContext.jsx';
import SignUpForm from '../../SignUpForm/SignUpForm.jsx'
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch.jsx'
import Modal from '../../Modal/Modal.jsx';

export default function Login() {
  // local context for testing
  const {
    isLocalLoggedIn,
    localUser,
    localLogin,
    localLogout,
    localAuthTest
  } = useContext(LocalAuthContext);

  const [user, setUser] = useState({
    user_id: 3,
    name: "Eater",
    email: "eater@gmail.com"
  });

  // auth context for live site
  const {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  } = useContext(AuthContext);

  // states for login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to control modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // local auth - uncomment for local testing, comment out for live site
    // if (isLocalLoggedIn) return
    // setUser({ ...user, email: email, password: password }); 
    // localLogin(user);
    // setTimeout(() => {
    //   alert(`Email: ${email}, Password: ${password}`);
    //   navigate('/');
    // }, 500);

    // auth - uncomment for live site, comment out for local testing
    if (currentUser) return
    try {
      const userCredential = await loginWithEmail(email, password);
      const user = userCredential.user;
      alert('Login successful!');
      setEmail('');
      setPassword('');
      navigate(`/myaccount`)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert('Login failed. Please try again.');
        setPassword('');
        throw error;
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
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
    <div className="login-form-container">
      <div className="login-form-box">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group-email">
            <label htmlFor="email" className="login-form-label-email">
              Email:
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-form-input-field-email"
            />
            </label>
          </div>
          <div className="login-form-group-password">
            <label htmlFor="password" 
            className="login-form-label-password">
              Password:
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-form-input-field-password"
            />
            </label>
          </div>
          <button type="submit" className="login-form-button">Sign In</button>
          
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

          {/* <h5 className="login-form-signup-prompt">
            Not Registered? <Link to="#" onClick={handleSignUpClick}>Sign Up</Link>
          </h5> */}

          <h5 className="login-form-signup-prompt">
            Not Registered? <a href="#" onClick={() => setCurrentForm('signup')}>Sign Up</a>
          </h5>

          
        </form>
      </div>


      {/* Render the Modal with SignUpForm */}
      {/* {isModalOpen && (
        <Modal onClose={closeModal}>
          <SignUpForm onClose={closeModal} />
        </Modal>
      )} */}
    </div>
  );
}