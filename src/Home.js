import React from 'react'

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Shopping List app!</h1>
      <div className="login-section">
        Login below
        <form>
          <label>E-Mail </label>
          <input type="email" />
          <br />
          <label>Password </label>
          <input type="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
      <div className="sign-up-section ">
        Or create your user below
        <button>Sign Up!</button>
      </div>
    </div>
  )
}
