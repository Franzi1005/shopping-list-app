import axios from 'axios'
import React, { useState } from 'react'
import './entryscreen.css'

export default function EntryScreen() {
  let [shoppingLists, setShoppingLists] = useState([])
  let [shoppingListData, setShoppingListData] = useState({ ready: false })

  function getShoppingLists() {
    let apiUrl = 'http://localhost:5000/api/shoppingLists'
    axios
      .get(apiUrl)
      .then((response) => {
        setShoppingLists(response.data)
      })
      .then(setShoppingListData({ ready: true }))
  }

  if (shoppingListData.ready === true) {
    return (
      <div className="entry-screen">
        <h2>Welcome to your personal space!</h2>
        <button>New shopping list</button>
        <br />
        <ul>
          {shoppingLists.map((shoppingList) => (
            <li key={shoppingList.shopping_list_id}>
              <div className="shopping-list-card">
                <h4>{shoppingList.sl_name}</h4>
              </div>
            </li>
          ))}
        </ul>
        <a href="">Edit User Details</a>
        <button>Logout</button>
      </div>
    )
  } else {
    getShoppingLists()

    return (
      <div className="entry-screen">
        <h2>Welcome to your personal space!</h2>
        <button>New shopping list</button>
        <br />
        <a href="">Edit User Details</a>
        <div>Whoopsie, something went wrong here</div>
      </div>
    )
  }
}
