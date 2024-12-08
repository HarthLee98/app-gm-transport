import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Header } from 'semantic-ui-react'

function Home() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem('token')
    // Redirigir al login
    navigate('/login')
  }

  return (
    <Container textAlign="center" style={{ marginTop: '50px' }}>
      <Header as="h1" color="blue">
        Bienvenido a GM Transport
      </Header>
      <p>Esta es una página sencilla de inicio.</p>
      <Button color="blue" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </Container>
  )
}

export default Home
