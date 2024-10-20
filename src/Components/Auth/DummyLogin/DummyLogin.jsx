// import './Login.css'; // Import the CSS file for styling
import { useState, useContext } from 'react';
import { LocalAuthContext } from '../../../Context/LocalAuth/LocalAuthContext.jsx';

export default function DummyLogin({ setAuthToggle }) {
  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);

  const [user, setUser] = useState({
    user_id: '',
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    localLogin(user)
    setTimeout(() => {
      alert(`User ${user.user_id} logged in!`);
    }, 500)
    // add the authentication logic here
  };

  return (
    <div>
      <div className="login-box">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="number"
              placeholder="User ID"
              value={user.user_id}
              onChange={(e) => setUser({...user, user_id: e.target.value})}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
          <h5 className="signup-prompt">
            Not Registered? <span onClick={() => setAuthToggle('signUp')} >Sign Up</span>
          </h5>
        </form>
      </div>
    </div>
  );
}