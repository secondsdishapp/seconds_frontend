import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalAuthContext } from '../../../Context/LocalAuth/LocalAuthContext.jsx';

export default function DummySignup({ setAuthToggle }) {
  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newUser)

    setTimeout(() => {
      alert(`Test user created!`);
      navigate('/myaccount')
    }, 500)
    // add the authentication logic here
  };

  return (
    <div>
      <div className="login-box">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button">Create Account</button>
          <h5 className="signup-prompt">
            Already Have an Account? <span onClick={() => setAuthToggle('signIn')} >Sign In</span>
          </h5>
        </form>
      </div>
    </div>
  );
}