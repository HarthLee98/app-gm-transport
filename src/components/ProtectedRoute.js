import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode' // Importación corregida

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    // Si no hay token, redirigir al inicio de sesión
    return <Navigate to="/login" />
  }

  try {
    // Decodificar el token sin validar
    const decoded = jwtDecode(token)

    // Verificar expiración del token
    const isExpired = Date.now() >= decoded.exp * 1000
    if (isExpired) {
      localStorage.removeItem('token') // Eliminar token expirado
      return <Navigate to="/login" />
    }
  } catch (error) {
    console.error('Error al decodificar el token:', error.message)
    return <Navigate to="/login" />
  }

  // Si todo está bien, renderizar el componente protegido
  return children
}

export default ProtectedRoute
