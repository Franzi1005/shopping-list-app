import React, { useState } from 'react'
import axios from 'axios'
import './shoppingItem.css'

export default function ShoppingItem(props) {
  let [isChecked, setIsChecked] = useState(false)
  // let [selectedItems, setSelectedItems] = useState([])
  let [updatedShoppingItem, setUpdatedShoppingItem] = useState({
    name: props.name,
    amount: props.amount,
    bought: isChecked,
  })

  function deleteShoppingItem() {
    let apiUrl = `http://localhost:5000/api/shoppingItems/${props.id}`
    axios.delete(apiUrl).then(() => props.getShoppingItems())
  }

  function updateShoppingItem() {
    let apiUrl = `http://localhost:5000/api/shoppingItems/${props.id}`
    axios
      .put(apiUrl, {
        item_id: props.id,
        name: updatedShoppingItem.name,
        amount: updatedShoppingItem.amount,
        bought: isChecked,
      })
      .then(() => props.setToEditMode(null))
      .then(() => props.getShoppingItems()) // note for myself ()=> is needed to kind of delay the call, without htey are invoked immediately
  }

  function handleItemChange(event) {
    setUpdatedShoppingItem({
      ...updatedShoppingItem,
      [event.target.name]: event.target.value,
    })
  }

  function handleEditClick() {
    props.setToEditMode(props.id)
  }

  function handleCheck(event) {
    setIsChecked(event.target.checked)
    setUpdatedShoppingItem({
      ...updatedShoppingItem,
      bought: event.target.checked,
    })
  }

  if (props.id === props.editableId) {
    return (
      <div className="ShoppingItem">
        <div className="singleShoppingItem">
          <input
            type="text"
            value={updatedShoppingItem.name}
            onChange={handleItemChange}
            name="name"
          ></input>
          <input
            type="number"
            className="amount"
            value={updatedShoppingItem.amount}
            onChange={handleItemChange}
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
            checked={isChecked}
            onChange={handleCheck}
          />
          <span
            contentEditable="false"
            style={{
              textDecoration: isChecked ? 'line-through' : 'none',
            }}
          >
            {props.name}
          </span>
          <span
            className="itemAmount"
            style={{
              textDecoration: isChecked ? 'line-through' : 'none',
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
