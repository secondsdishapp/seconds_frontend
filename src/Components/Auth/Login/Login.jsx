// import './Login.css'; 
// Import the CSS file for styling
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; //this will allow programmatic navigation to a different Page
import { LocalAuthContext } from '../../../Context/LocalAuth/LocalAuthContext.jsx';
import SignUpForm from '../../SignUpForm/SignUpForm.jsx'
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch.jsx'
import Modal from '../../Modal/Modal.jsx';


export default function Login() {
  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);
  // current user
  const [user, setUser] = useState({
    user_id: 3,
    name: "Eater",
    email: "eater@gmail.com"
  })

  //states for form input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //useNavigate hook
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({...user, email: email, password: password})
    localLogin(user)
    setTimeout(() => {
      alert(`Email: ${email}, Password: ${password}`);
      navigate('/');
    }, 500);
  };

  return (
    <div className="login-container">
      {/* <div>
        <h1>Hello, {localUser.name}!</h1>
        <button onClick={() => localLogin(user)}>Login</button>
        <button onClick={() => localLogout()}>Logout</button>
      </div> */}
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
          <button type="submit" className="login-button">Sign In</button>
          <h5 className="signup-prompt">
            Not Registered? <Link>Sign In</Link>
          </h5>
        </form>
      
      </div>
    </div>
  )
}