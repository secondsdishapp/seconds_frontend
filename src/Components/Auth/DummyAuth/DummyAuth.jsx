import { useState, useContext } from 'react';
import { LocalAuthContext } from '../../../Context/LocalAuth/LocalAuthContext.jsx';
import DummyLogin from '../../Auth/DummyLogin/DummyLogin.jsx';
import DummySignup from '../../Auth/DummySignup/DummySignup.jsx';

export default function DummyAuth() {
  console.log('DUMMY AUTH')
  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);
  const [ authToggle, setAuthToggle ] = useState('signIn');

  console.log('DUMMY AUTH')
  return (
    <div>
      DUMMY AUTH
      <div>
        <h1>Hello, {localUser.name}!</h1>
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