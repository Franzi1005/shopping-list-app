import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ShoppingItem from './ShoppingItem'
import './list.css'

export default function List(props) {
  let [items, setItems] = useState([])
  let [newShoppingItem, setNewShoppingItem] = useState({
    name: '',
    amount: '1',
  })
  let [editableId, setEditableID] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    let apiUrl = 'http://localhost:5000/api/shoppingItems'
    axios
      .post(apiUrl, {
        name: newShoppingItem.name,
        amount: newShoppingItem.amount,
      })
      .then(getShoppingItems)
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
    if (event.target.value < 1) {
      alert('Quantity should be at least 1!')
    }
    setNewShoppingItem({
      ...newShoppingItem,
      [event.target.name]: event.target.value,
    })
  }

  function setToEditMode(id) {
    setEditableID(id)
  }

  return (
    <div className="listWrapper">
      <div className="list">
        <h1>Shopping list🦆</h1>
        <div className="inputSection">
          <input
            placeholder="Enter shopping item..."
            value={newShoppingItem.name}
            onChange={handleChange}
            name="name"
          ></input>
          <input
            type="number"
            className="amount"
            min="1"
            value={newShoppingItem.amount}
            onChange={handleChange}
            name="amount"
          ></input>
          <button type="submit" onClick={handleSubmit}>
            Add
          </button>
        </div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <ShoppingItem
                name={item.name}
                id={item.item_id}
                amount={item.amount}
                bought={item.bought}
                setToEditMode={setToEditMode}
                editableId={editableId}
                getShoppingItems={getShoppingItems}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
