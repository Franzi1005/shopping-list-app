import './App.css'
import List from './List'
import Home from './Home'
import SignUpForm from './SignUpForm'
import EntryScreen from './EntryScreen'
import NotFound from './NotFound'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createUser" element={<SignUpForm />} />
      <Route path="/shoppinglists" element={<EntryScreen />} />
      <Route path="/shoppingLists/:id" element={<List />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
