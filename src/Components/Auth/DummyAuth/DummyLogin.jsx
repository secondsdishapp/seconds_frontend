import { useState, useContext } from 'react'

export default function DummyLogin() {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  function handleSubmit() {
    e.preventDefault()
    console.log('submit works')
  }
  
  return (
    <div>
      <div className="login-box">
        <h2>Login to Seconds!</h2>
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