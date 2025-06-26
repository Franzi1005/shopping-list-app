import axios from 'axios'
import React, { useState } from 'react'
import '../../styles/personalSpace.css'
import CreateShopListModal from '../../Components/CreateShopListModal'
import ListItem from './ListItem'
import { useNavigate } from 'react-router-dom'

export default function PersonalSpace() {
  const navigate = useNavigate()
  let [shoppingLists, setShoppingLists] = useState([])
  let [shoppingListData, setShoppingListData] = useState({ ready: false })
  let [isOpen, setIsOpen] = useState(false)

  const token = localStorage.getItem('x-auth-token')

  function getShoppingLists() {
    let apiUrl = 'http://localhost:5000/api/shoppinglists'
    axios
      .get(apiUrl, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setShoppingLists(response.data)
      })
      .then(() => {
        setShoppingListData({ ready: true })
      })
  }

  function createShoppingList(newShoppingListName) {
    let apiUrl = 'http://localhost:5000/api/shoppinglists'
    axios
      .post(
        apiUrl,
        { name: newShoppingListName },
        { headers: { 'x-auth-token': token } }
      )
      .then(() => setIsOpen(false))
      .then(() => {
        getShoppingLists()
      })
  }

  function handleLogout() {
    alert('Logging out')
    localStorage.removeItem('x-auth-token')
    navigate('/')
  }

  if (shoppingListData.ready === true) {
    return (
      <div className="entry-screen">
        <h2>Welcome to your personal space!</h2>
        <p>Start by creating your first shopping list below🐥</p>
        <button
          onClick={() => {
            setIsOpen(true)
          }}
        >
          New shopping list
        </button>

        <CreateShopListModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          createShoppingList={createShoppingList}
        />

        <br />
        <ul>
          {shoppingLists.map((shoppingList) => (
            <li key={shoppingList.shopping_list_id}>
              <div className="shopping-list-card">
                <ListItem
                  name={shoppingList.sl_name}
                  id={shoppingList.shopping_list_id}
                  getShoppingLists={getShoppingLists}
                />
              </div>
            </li>
          ))}
        </ul>
        <a href="">Edit User Details</a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  } else {
    getShoppingLists()
  }
}
