import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ReviewForm from './pages/ReviewForm'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/new' element={<ReviewForm />} />
      <Route path='/:id' element={<ReviewForm />} />

    </Routes>
  )
}

export default App