import React from 'react'
import './home.css'

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Shopping List app!</h1>
      <div className="login-section">
        <h2>Login below🦐</h2>
        <form>
          <input type="email" placeholder="E-Mail address" />
          <br />
          <input type="password" placeholder="Password" />
          <br />
          <input type="submit" value="Login" className="submit-button" />
        </form>
      </div>
      <div className="sign-up-form">
        Or
        <br />
        <button className="submit-button">Create new account</button>
      </div>
    </div>
  )
}
