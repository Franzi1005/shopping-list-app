import React, { useState } from 'react'
import './createShopListModal.css'

export default function CreateShopListModal({
  open,
  onClose,
  createShoppingList,
}) {
  let [newShoppingListName, setNewShoppingListName] = useState('')

  function handleChange(e) {
    e.preventDefault()
    setNewShoppingListName(e.target.value)
  }

  if (!open) return null
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
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => createShoppingList(newShoppingListName)}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
