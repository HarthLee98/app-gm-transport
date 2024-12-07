import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login' // Asegúrate de que la ruta sea correcta
import Register from './pages/Register' // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />{' '}
        {/* Redirige al login por defecto */}
      </Routes>
    </Router>
  )
}

export default App
