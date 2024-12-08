import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import RoutesCatalog from './pages/RoutesCatalog'
import BoothsCatalog from './pages/BoothsCatalog'
import UnitsCatalog from './pages/UnitsCatalog'
import FuelPricesCatalog from './pages/FuelPricesCatalog'
import GenerateBudget from './pages/GenerateBudget'
import Reports from './pages/Reports'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        {/* Ruta protegida para Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas para los catálogos */}
        <Route
          path="/routes_catalog"
          element={
            <ProtectedRoute>
              <RoutesCatalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booths_catalog"
          element={
            <ProtectedRoute>
              <BoothsCatalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/units_catalog"
          element={
            <ProtectedRoute>
              <UnitsCatalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fuel_prices_catalog"
          element={
            <ProtectedRoute>
              <FuelPricesCatalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate_budget"
          element={
            <ProtectedRoute>
              <GenerateBudget />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
