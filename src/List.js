import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ShoppingItem from './ShoppingItem'
import './list.css'

export default function List(props) {
  let [items, setItems] = useState([])
  let [newShoppingItem, setNewShoppingItem] = useState('')
  let [editableId, setEditableID] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    let apiUrl = 'http://localhost:5000/api/shoppingItems'
    axios.post(apiUrl, { name: newShoppingItem }).then(getShoppingItems)
  }

  function getShoppingItems() {
    let apiUrl = 'http://localhost:5000/api/shoppingItems'
    axios.get(apiUrl).then((response) => {
      setItems(response.data)
    })
  }

  useEffect(() => {
    getShoppingItems()
  }, [])

  function handleChange(event) {
    setNewShoppingItem(event.target.value)
  }

  function setToEditMode(id) {
    setEditableID(id)
  }

  return (
    <div className="list">
      <input
        placeholder="Enter shopping item..."
        onChange={handleChange}
      ></input>
      <input type="number" className="amount"></input>
      <button type="submit" onClick={handleSubmit}>
        Add
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ShoppingItem
              name={item.name}
              id={item.id}
              setToEditMode={setToEditMode}
              editableId={editableId}
              getShoppingItems={getShoppingItems}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
