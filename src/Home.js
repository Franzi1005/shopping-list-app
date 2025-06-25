import React, { useState } from 'react'
import './home.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  let [user, setUser] = useState({
    email: '',
    password: '',
  })
  let [success, setSuccess] = useState({ success: true })

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    let apiUrl = 'http://localhost:5000/api/auth'

    axios
      .post(apiUrl, { email: user.email, password: user.password })
      .then((data) => {
        localStorage.setItem('x-auth-token', data.data)
        navigate('/shoppinglists')
      })
      .catch(() => {
        setSuccess(false)
      })
  }

  return (
    <div className="home">
      <h1>Welcome to the Shopping List app!</h1>
      <div className="login-section">
        <h2>Login below🦐</h2>
        <form>
          <input
            type="email"
            placeholder="E-Mail address"
            onChange={handleChange}
            name="email"
            required
            autoComplete="off"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            required
          />
          <br />

          <p className={success ? 'invisible' : 'visible'}>
            Incorrect password or username
          </p>
          <input
            type="submit"
            value="Login"
            className="submit-button"
            onClick={handleSubmit}
          />
        </form>
      </div>
      <div className="sign-up-form">
        Or
        <br />
        <button className="submit-button">
          <Link to="/createUser">Create new account</Link>
        </button>
      </div>
    </div>
  )
}
