import { useContext } from 'react'
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

  async function handleLogout(e) {
    e.preventDefault()
    await logout()
    alert('See you soon!')
  }
  
  console.log(currentUser)

  return (
    <div>
      DummyAuth
      <button type="button" onClick={handleLogout}>Log Out</button>
      <DummyLogin />
      <DummySignup />
    </div>
  )
}