import './Login.css'; 
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LocalAuthContext } from '../../../Context/LocalAuth/LocalAuthContext.jsx';
import SignUpForm from '../../SignUpForm/SignUpForm.jsx'
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch.jsx'
import Modal from '../../Modal/Modal.jsx';

export default function Login() {
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to control modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, email: email, password: password });
    localLogin(user);
    setTimeout(() => {
      alert(`Email: ${email}, Password: ${password}`);
      navigate('/');
    }, 500);
  };

  const handleSignUpClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };


  return (
    <div className="login-form-container">
      <div className="login-form-box">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group-email">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-form-input-field-email"
            />
          </div>
          <div className="login-form-group-password">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-form-input-field-password"
            />
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
            <h5 className="login-form-signup-prompt">
            Not Registered? <Link to="#" onClick={handleSignUpClick}>Sign Up</Link>
          </h5>
        </form>
      </div>

      {/* Render the Modal with SignUpForm */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <SignUpForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}