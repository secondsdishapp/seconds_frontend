import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/FirebaseAuth/AuthContext.jsx';
import { createUser } from '../../../Services/users.services.js';

export default function DummySignup({ setAuthToggle }) {
  // context
  const {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formConfirmPassword, setFormConfirmPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (formPassword !== formConfirmPassword || !formEmail || !formPassword || !formConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await signUpWithEmail(formEmail, formPassword);
      const user = userCredential.user;
      const { uid, email } = user;
      await sendUserToDb(uid, email);
      alert('Signup successful!');
      setFormEmail('');
      setFormPassword('');
      setFormConfirmPassword('');
      // navigate('/myaccount')
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert('Signup failed. Please try again.');
        setFormPassword('');
        setFormConfirmPassword('');
      throw error;
    }
  };

  async function sendUserToDb(firebase_id, email) {
    try {
      const newUser = await createUser({firebase_id, email});
      console.log(newUser);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div>
      <div className="login-box">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={formConfirmPassword}
              onChange={(e) => setFormConfirmPassword(e.target.value)}
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
      <button onClick={() => sendUserToDb()}>Send User to DB</button>
    </div>
  );
}