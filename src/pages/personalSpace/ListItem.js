import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ListItem(props) {
  const token = localStorage.getItem('x-auth-token')
  const navigate = useNavigate()
  function deleteShoppingList() {
    let apiUrl = `http://localhost:5000/api/shoppinglists/${props.id}`
    axios
      .delete(apiUrl, { headers: { 'x-auth-token': token } })
      .then(() => props.getShoppingLists())
  }

  function editShoppingList() {
    navigate(`/shoppinglists/${props.id}`)
  }

  return (
    <div>
      <h4>{props.name}</h4>
      <button>
        <i className="fa-regular fa-trash-can" onClick={deleteShoppingList}></i>
      </button>
      <button>
        <i className="fa-solid fa-pen" onClick={editShoppingList}></i>
      </button>
    </div>
  )
}
