import './DummyAuth.css';
import { useState, useContext } from 'react';
import { LocalAuthContext } from '../../../Context/LocalAuth/LocalAuthContext.jsx';
import { AuthContext } from '../../../Context/FirebaseAuth/AuthContext.jsx';
import DummyLogin from '../../Auth/DummyLogin/DummyLogin.jsx';
import DummySignup from '../../Auth/DummySignup/DummySignup.jsx';

export default function DummyAuth() {
  console.log('DUMMY AUTH')
  // context
  const {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  } = useContext(AuthContext);
  const [ authToggle, setAuthToggle ] = useState('signIn');

  console.log(currentUser)

  console.log('DUMMY AUTH')
  return (
    <div className='dummyAuth'>
      DUMMY AUTH
      <div className='dummyAuth-header'>
        <h1>Hello, {currentUser?.displayName || currentUser?.email}!</h1>
      </div>
      <button onClick={() => setAuthToggle('signIn')}>Sign In</button>
      <button onClick={() => setAuthToggle('signUp')}>Sign Up</button>
      {authToggle === 'signIn' ?
        <DummyLogin setAuthToggle={setAuthToggle} /> :
        <DummySignup setAuthToggle={setAuthToggle} />
      }
      DUMMY AUTH
    </div>
  );
}