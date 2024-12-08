import React from 'react'
import { Button, Container } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

const PageLayout = ({ children }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token') // Elimina el token
    navigate('/login') // Redirige al login
  }

  return (
    <Container style={{ position: 'relative', padding: '20px' }}>
      {/* Botón de cerrar sesión */}
      <Button
        color="blue"
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1,
        }}
      >
        Cerrar Sesión
      </Button>
      {/* Contenido de la página */}
      {children}
    </Container>
  )
}

export default PageLayout
