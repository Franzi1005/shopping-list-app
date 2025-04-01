import axios from 'axios'
import React, { useState } from 'react'
import './signUpForm.css'

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
    <div className="sign-up-form">
      <form>
        <label>User Name </label>
        <input type="text" onChange={handleChange} name="userName" />
        <label>E-Mail </label>
        <input type="email" onChange={handleChange} name="email" />
        <br />
        <label>Password </label>
        <input type="password" onChange={handleChange} name="password" />
        <input type="submit" value="Register!" onClick={handleSubmit} />
      </form>
    </div>
  )
}
