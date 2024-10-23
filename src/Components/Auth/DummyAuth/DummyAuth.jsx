import { useState, useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext/AuthContext.jsx'

import DummyLogin from './DummyLogin.jsx'
import DummySignup from './DummySignup.jsx'

export default function DummyAuth() {

  const {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  } = useContext(AuthContext);

  const [ authToggle, setAuthToggle ] = useState('signIn');

  async function handleLogout(e) {
    e.preventDefault()
    await logout()
    alert('See you soon!')
  }
  
  console.log(currentUser)

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
  )
}