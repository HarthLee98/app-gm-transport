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
import { createUser } from '../store/actions/users'
import logo from '../images/logo-gmt.png' // Ajusta la ruta según tu proyecto

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    const item = { name, email, password } // Agrupamos los datos en "item"

    try {
      await createUser(item)
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
            <Button color="blue" fluid size="large" onClick={handleSubmit}>
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
