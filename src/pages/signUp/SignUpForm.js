import axios from 'axios'
import React, { useState } from 'react'
import '../../styles/home.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function SignUpForm() {
  const navigate = useNavigate()

  let [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    password: '',
  })

  let [success, setSuccess] = useState({
    userName: true,
    email: true,
    password: true,
  })

  let [errorMessage, setErrorMessage] = useState('')

  function handleChange(event) {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
    setErrorMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const fieldErrors = {
      userName: newUser.userName.trim() !== '',
      email: newUser.email.trim() !== '',
      password: newUser.password.trim() !== '',
    }

    setSuccess(fieldErrors)

    const isFormValid = Object.values(fieldErrors).every((val) => val === true)

    if (!isFormValid) return
    let apiUrl = 'http://localhost:5000/api/users'

    axios
      .post(apiUrl, {
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password,
      })
      .then((data) => {
        setSuccess(true)
        localStorage.setItem('x-auth-token', data.headers['x-auth-token'])
        navigate('/shoppinglists')
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            setErrorMessage('This email is already registered.')
          } else {
            setErrorMessage(error.response.data)
          }
        }
      })
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
          autoComplete="off"
        />
        <p className={success.userName ? 'complete' : 'incomplete'}>
          Please enter a user name
        </p>
        <br />
        <input
          placeholder="E-Mail"
          type="email"
          onChange={handleChange}
          name="email"
          autoComplete="off"
        />
        <p className={success.email ? 'complete' : 'incomplete'}>
          Please enter an email address
        </p>
        <br />
        <input
          placeholder="Password"
          type="password"
          onChange={handleChange}
          name="password"
        />
      </form>
      <p className={success.password ? 'complete' : 'incomplete'}>
        Please enter a password
      </p>

      {errorMessage && <p className="incomplete">{errorMessage}</p>}
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
