import axios from 'axios'
import React, { useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'

export default function SignUpForm() {
  let [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    password: '',
  })

  function handleChange(event) {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    let apiUrl = 'http://localhost:5000/api/users'
    axios
      .post(apiUrl, {
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password,
      })
      .then(alert(`New user ${newUser.userName} created`))
  }

  return (
    <div className="login-section">
      <h2>Create a new account 🐳</h2>
      <form className="sign-up-form">
        <input
          placeholder="User name"
          type="text"
          onChange={handleChange}
          name="userName"
        />
        <br />
        <input
          placeholder="E-Mail"
          type="email"
          onChange={handleChange}
          name="email"
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          onChange={handleChange}
          name="password"
        />
      </form>
      <input
        className="submit-button"
        type="submit"
        value="Register"
        onClick={handleSubmit}
      />
      <br />
      <p>
        <Link to="/">Already registered?</Link>
      </p>
    </div>
  )
}
