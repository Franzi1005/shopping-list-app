import axios from 'axios'
import React, { useState } from 'react'
import '../../styles/personalSpace.css'
import CreateShopListModal from '../../Components/CreateShopListModal'
import { useNavigate } from 'react-router-dom'

export default function PersonalSpace() {
  const navigate = useNavigate()
  let [shoppingLists, setShoppingLists] = useState([])
  let [shoppingListData, setShoppingListData] = useState({ ready: false })

  let [openModal, setOpenModal] = useState(false)

  const token = localStorage.getItem('x-auth-token')

  function getShoppingLists() {
    let apiUrl = 'http://localhost:5000/api/shoppingLists'
    axios
      .get(apiUrl, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setShoppingLists(response.data)
      })
      .then(() => {
        setShoppingListData({ ready: true })
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
        <button
          onClick={() => {
            setOpenModal(true)
          }}
        >
          New shopping list
        </button>
        {openModal && <CreateShopListModal closeModal={setOpenModal} />}
        <br />
        <ul>
          {shoppingLists.map((shoppingList) => (
            <li key={shoppingList.shopping_list_id}>
              <div className="shopping-list-card">
                <h4>{shoppingList.sl_name}</h4>
                <button>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
                <button>
                  <i className="fa-solid fa-pen"></i>
                </button>
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
