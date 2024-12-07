import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './pages/Login' // Ruta al componente Login

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la raíz a /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Ruta del login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
