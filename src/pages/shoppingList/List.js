import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ShoppingItem from './ShoppingItem'
import '../../styles/list.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function List(props) {
  const navigate = useNavigate()
  const token = localStorage.getItem('x-auth-token')
  const { id } = useParams()

  let [items, setItems] = useState([])
  let [newShoppingItem, setNewShoppingItem] = useState({
    name: '',
    amount: '1',
    id: id,
  })
  let [editableId, setEditableID] = useState('')
  let [updatedShoppingItem, setUpdatedShoppingItem] = useState({
    name: '',
    amount: '',
    bought: false,
  })

  let [accessGranted, setAccessGranted] = useState(true)

  // GET
  function getShoppingItems() {
    let apiUrl = `http://localhost:5001/api/shoppingLists/${id}/items`
    axios
      .get(apiUrl, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setItems(response.data)
      })
  }

  function getShoppingList() {
    let apiUrl = `http://localhost:5001/api/shoppingLists/${id}`
    axios.get(apiUrl, { headers: { 'x-auth-token': token } }).then(()=>{getShoppingItems()}).catch(()=>setAccessGranted(false))
  }
  // POST
  function handleSubmit(event) {
    event.preventDefault()
    let apiUrl = `http://localhost:5001/api/shoppingLists/${id}/items`
    axios
      .post(
        apiUrl,
        {
          name: newShoppingItem.name,
          amount: newShoppingItem.amount,
          shopping_list_id: id,
        },
        { headers: { 'x-auth-token': token } }
      )
      .then(getShoppingItems)
  }

  useEffect(() => {
    getShoppingList()
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

  // PUT
  function setToEditMode(id) {
    const itemToEdit = items.find((item) => item.item_id === id)
    setEditableID(id)
    setUpdatedShoppingItem(itemToEdit)
  }

  function handleItemChange(event) {
    if (event.target.value < 1) {
      alert('Please enter amount')
    }
    setUpdatedShoppingItem({
      ...updatedShoppingItem,
      [event.target.name]: event.target.value,
    })
  }

  // PUT - Tickbox
  async function handleCheck(event) {
    const check = event.target.checked
    const id = event.target.id
    await toggleBoughtStatus(check, id)
  }

  async function toggleBoughtStatus(check, itemId) {
    let apiUrl = `http://localhost:5001/api/shoppingLists/${id}/items/${itemId}`
    axios
      .put(apiUrl, {
        bought: check,
      }, { headers: { 'x-auth-token': token } })
      .then(() => getShoppingItems())
  }

  function handleLogout() {
    alert('Logging out')
    localStorage.removeItem('x-auth-token')
    navigate('/')
  }

  if (accessGranted){
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
            autoComplete="off"
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
                shopping_list_id={item.shopping_list_id}
                setToEditMode={setToEditMode}
                editableId={editableId}
                getShoppingItems={getShoppingItems}
                updatedShoppingItem={updatedShoppingItem}
                setUpdatedShoppingItem={setUpdatedShoppingItem}
                handleItemChange={handleItemChange}
                handleCheck={handleCheck}
              />
            </li>
          ))}
        </ul>
        <button onClick={()=> navigate('/shoppingLists')}>Home</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )} else {
    return (<h1>List not found!🦆💀</h1>)
  }
}
