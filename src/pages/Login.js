import React, { useState } from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Image,
} from 'semantic-ui-react'
import logo from '../images/logo-gmt.png' // Asegúrate de que la ruta sea correcta

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    // Validación del formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmailError(!emailRegex.test(value))
  }

  const handleSubmit = () => {
    if (!emailError && email && password) {
      console.log('Correo:', email)
      console.log('Contraseña:', password)
    } else {
      console.error('Formulario inválido')
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {/* Logo */}
        <Image
          src={logo}
          alt="Logo GM Transport"
          size="large"
          centered
          style={{ marginBottom: '20px' }}
        />
        {/* Encabezado */}
        <Header as="h2" color="blue" textAlign="center">
          Iniciar Sesión
        </Header>
        {/* Formulario */}
        <Form size="large" onSubmit={(e) => e.preventDefault()}>
          <Segment stacked>
            {/* Input del correo */}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Correo Electrónico"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              error={
                emailError && {
                  content: 'Por favor, escribe un correo válido.',
                  pointing: 'below',
                }
              }
            />
            {/* Input de la contraseña */}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Botón de enviar */}
            <Button
              color="blue"
              fluid
              size="large"
              onClick={handleSubmit}
              disabled={emailError || !email || !password}
            >
              Iniciar Sesión
            </Button>
          </Segment>
        </Form>
        <Message>
          ¿No tienes una cuenta? <a href="#!">Regístrate</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login
