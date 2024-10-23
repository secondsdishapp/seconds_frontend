import { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext/AuthContext.jsx'

import DummyLogin from './DummyLogin.jsx'

export default function DummyAuth() {

  const {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  } = useContext(AuthContext);

  return (
    <div>
      DummyAuth
      <button type="button" onClick={logout}>Log Out</button>
      <DummyLogin />
    </div>
  )
}