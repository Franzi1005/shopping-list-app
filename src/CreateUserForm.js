import React, { useState } from 'react'
import axios from 'axios'

export default function CreateUserForm() {
  function handleSubmit(event) {
    event.preventDefault()
    let apiUrl = 'http://localhost:5000/api/users'
    axios
      .post(apiUrl, {
        userName: formData.user,
        password: formData.password,
      })
      .then(
        alert(
          `User ${formData.user} with password ${formData.password} created`
        )
      )
  }

  const [formData, setFormData] = useState({
    user: '',
    password: '',
  })

  function handleChange(event) {}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User name"
          name="username"
          value={formData.user}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          name="password"
          value={formData.password}
        ></input>
        {/* <input type="password" placeholder='Repeat password'></input> */}
        <input type="submit" value="Create User" />
      </form>
    </div>
  )
}
