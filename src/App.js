import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import RoutesPage from './pages/RoutesPage'
import BoothsPage from './pages/BoothsPage'
import UnitsPage from './pages/UnitsPage'
import FuelPricesPage from './pages/FuelPricesPage'
import GenerateBudgetPage from './pages/GenerateBudgetPage'
import ReportsPage from './pages/ReportsPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        {/* Ruta protegida para HomePage */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas para los catálogos */}
        <Route
          path="/routes"
          element={
            <ProtectedRoute>
              <RoutesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booths"
          element={
            <ProtectedRoute>
              <BoothsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/units"
          element={
            <ProtectedRoute>
              <UnitsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fuel_prices"
          element={
            <ProtectedRoute>
              <FuelPricesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate_budget"
          element={
            <ProtectedRoute>
              <GenerateBudgetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
