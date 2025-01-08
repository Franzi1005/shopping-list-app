import React, { useState } from 'react'
import axios from 'axios'
import './shoppingItem.css'

export default function ShoppingItem(props) {
  let [updatedShoppingItem, setUpdatedShoppingItem] = useState(props.name)

  function deleteShoppingItem() {
    let apiUrl = `http://localhost:5000/api/shoppingItems/${props.id}`
    axios.delete(apiUrl).then(() => props.getShoppingItems())
  }

  function updateShoppingItem() {
    let apiUrl = `http://localhost:5000/api/shoppingItems/${props.id}`
    axios
      .put(apiUrl, { id: props.id, name: updatedShoppingItem })
      .then(() => props.setToEditMode(null))
      .then(() => props.getShoppingItems()) // note for myself ()=> is needed to kind of delay the call, without htey are invoked immediately
  }

  function handleItemChange(event) {
    setUpdatedShoppingItem(event.target.value)
  }

  function handleEditClick() {
    props.setToEditMode(props.id)
  }

  if (props.id === props.editableId) {
    return (
      <div className="ShoppingItem">
        <div className="singleShoppingItem">
          <input type="checkbox" />
          <input
            type="text"
            value={updatedShoppingItem}
            onChange={handleItemChange}
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
          <input type="checkbox" />
          <span contentEditable="false">{props.name}</span>
          <span className="itemAmount">x 4</span>
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
