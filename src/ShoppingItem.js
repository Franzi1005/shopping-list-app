import React from 'react'
import axios from 'axios'
import './shoppingItem.css'

export default function ShoppingItem(props) {
  function deleteShoppingItem() {
    let apiUrl = `http://localhost:5000/api/shoppingItems/${props.id}`
    axios.delete(apiUrl).then(() => props.getShoppingItems())
  }

  function updateShoppingItem() {
    let apiUrl = `http://localhost:5000/api/shoppingItems/${props.id}`
    axios
      .put(apiUrl, {
        item_id: props.id,
        name: props.updatedShoppingItem.name,
        amount: props.updatedShoppingItem.amount,
        bought: props.updatedShoppingItem.bought,
      })
      .then(() => props.setToEditMode(null))
      .then(() => props.getShoppingItems()) // note for myself ()=> is needed to kind of delay the call, without htey are invoked immediately
  }

  function handleEditClick() {
    props.setToEditMode(props.id)
  }

  function handleCheckBoxChange(event) {
    event.preventDefault()
    props.handleCheck(event)
  }

  if (props.id === props.editableId) {
    return (
      <div className="ShoppingItem">
        <div className="singleShoppingItem">
          <input
            type="text"
            value={props.updatedShoppingItem.name}
            onChange={props.handleItemChange}
            name="name"
          ></input>
          <input
            type="number"
            className="amount"
            min="1"
            value={props.updatedShoppingItem.amount}
            onChange={props.handleItemChange}
            name="amount"
          ></input>
        </div>
        <div className="buttons">
          <button onClick={deleteShoppingItem}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
          <button onClick={updateShoppingItem}>
            <i className="fa-regular fa-floppy-disk"></i>
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="ShoppingItem">
        <div className="singleShoppingItem">
          <input
            type="checkbox"
            name="checkbox"
            value={props.id}
            id={props.id}
            checked={props.bought}
            onChange={handleCheckBoxChange}
          />
          <span
            contentEditable="false"
            style={{
              textDecoration: props.bought ? 'line-through' : 'none',
            }}
          >
            {props.name}
          </span>
          <span
            className="itemAmount"
            style={{
              textDecoration: props.bought ? 'line-through' : 'none',
            }}
          >
            x {props.amount}
          </span>
        </div>
        <div className="buttons">
          <button onClick={deleteShoppingItem}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
          <button onClick={handleEditClick}>
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      </div>
    )
  }
}
