import './App.css'
import List from './pages/shoppingList/List'
import Home from './pages/home/Home'
import SignUpForm from './pages/signUp/SignUpForm'
import PersonalSpace from './pages/personalSpace/PersonalSpace'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createUser" element={<SignUpForm />} />
      <Route path="/shoppinglists" element={<PersonalSpace />} />
      <Route path="/shoppinglists/:id" element={<List />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
