import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalAuthContext } from '../../../Context/LocalAuth/LocalAuthContext.jsx';
import { AuthContext } from '../../../Context/FirebaseAuth/AuthContext.jsx';

export default function DummySignup({ setAuthToggle }) {
  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);

  const {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (password !== confirmPassword || !email || !password || !confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await signUpWithEmail(email, password);
      const user = userCredential.user;
      console.log(user);
      alert('Signup successful!');
      setEmail('');
      setPassword('');
      // navigate('/myaccount')
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert('Signup failed. Please try again.');
        setPassword('');
        throw error;
    }
  };

  console.log(currentUser);

  return (
    <div>
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