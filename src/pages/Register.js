import React, { useState } from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Image,
  Popup,
} from 'semantic-ui-react'
import { createLoginUser } from '../store/actions/users'
import logo from '../images/logo-gmt.png'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPasswordPopup, setShowPasswordPopup] = useState(false)

  // Función para verificar si el formulario es válido
  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== ''
    )
  }

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    const item = { name, email, password }

    try {
      await createLoginUser(item)
      setSuccess(true)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Image
          src={logo}
          alt="Logo GM Transport"
          size="large"
          centered
          style={{ marginBottom: '20px' }}
        />
        <Header as="h2" color="blue" textAlign="center">
          Registro de Usuario
        </Header>
        <Form size="large" onSubmit={(e) => e.preventDefault()}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Popup
              content="La contraseña debe tener al menos 8 caracteres."
              open={showPasswordPopup}
              position="right center"
              trigger={
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                  onFocus={() => setShowPasswordPopup(true)} // Muestra el pop-up
                  onBlur={() => setShowPasswordPopup(false)} // Oculta el pop-up
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              }
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Repetir Contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              color="blue"
              fluid
              size="large"
              onClick={handleSubmit}
              disabled={!isFormValid()}
            >
              Registrarse
            </Button>
          </Segment>
        </Form>
        {success && (
          <Message success>
            <Message.Header>Usuario creado con éxito</Message.Header>
            <p>Puedes iniciar sesión con tu cuenta.</p>
          </Message>
        )}
        {error && (
          <Message error>
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
          </Message>
        )}
        <Message>
          ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Register
