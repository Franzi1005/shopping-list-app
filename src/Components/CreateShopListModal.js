import React, { useState } from 'react'
import './createShopListModal.css'
import axios from 'axios'

export default function CreateShopListModal({ closeModal }) {
  let [newShoppingListName, setNewShoppingListName] = useState('')

  const token = localStorage.getItem('x-auth-token')

  function createShoppingList() {
    let apiUrl = 'http://localhost:5000/api/shoppingLists'
    axios.post(
      apiUrl,
      { name: newShoppingListName },
      { headers: { 'x-auth-token': token } }
    )
  }

  function handleChange(e) {
    e.preventDefault()
    setNewShoppingListName(e.target.value)
  }

  return (
    <div className="modalBackground">
      <div className="create-shop-list-modal">
        <div className="modal-header">
          <h3>Create a new shopping list</h3>
        </div>
        <div className="modal-body">
          <form>
            <input
              placeholder="Enter a name for your shopping list"
              onChange={handleChange}
            ></input>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={() => closeModal(false)}>Cancel</button>
          <button onClick={createShoppingList}>Create</button>
        </div>
      </div>
    </div>
  )
}
