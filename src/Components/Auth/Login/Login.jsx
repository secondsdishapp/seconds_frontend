import './Login.css'; // Import the CSS file for styling
import { useState, useContext } from 'react';
import { LocalAuthContext } from '../../../Context/LocalAuth/LocalAuthContext.jsx';

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({...user, email: email, password: password})
    localLogin(user)
    setTimeout(() => {
      alert(`Email: ${email}, Password: ${password}`);
    }, 500)
    // add the authentication logic here
  };

  return (
    <div>
      <div>
        <h1>Hello, {localUser.name}!</h1>
        <button onClick={() => localLogin(user)}>Login</button>
        <button onClick={() => localLogout()}>Logout</button>
      </div>
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
          <button type="submit" className="login-button">Log In</button>
          <h5 className="signup-prompt">
            Not Registered? <a href="/register">Sign Up</a>
          </h5>
        </form>
      </div>
    </div>
  )
}