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

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    // Validación del formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmailError(!emailRegex.test(value))
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)

    // Validar que las contraseñas coincidan
    setPasswordError(e.target.value !== confirmPassword)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)

    // Validar que las contraseñas coincidan
    setPasswordError(password !== e.target.value)
  }

  const handleSubmit = () => {
    if (
      !emailError &&
      !passwordError &&
      name &&
      email &&
      password &&
      confirmPassword
    ) {
      console.log('Nombre:', name)
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
          Registro de Usuario
        </Header>
        {/* Formulario */}
        <Form size="large" onSubmit={(e) => e.preventDefault()}>
          <Segment stacked>
            {/* Nombre */}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {/* Email */}
            <Form.Input
              fluid
              icon="mail"
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
            {/* Contraseña */}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {/* Confirmar Contraseña */}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Repetir Contraseña"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              error={
                passwordError && {
                  content: 'Las contraseñas no coinciden.',
                  pointing: 'below',
                }
              }
            />
            {/* Botón de enviar */}
            <Button
              color="blue"
              fluid
              size="large"
              onClick={handleSubmit}
              disabled={
                emailError ||
                passwordError ||
                !name ||
                !email ||
                !password ||
                !confirmPassword
              }
            >
              Registrarse
            </Button>
          </Segment>
        </Form>
        <Message>
          ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Register
