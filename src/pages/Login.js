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
import { useNavigate } from 'react-router-dom'
import { getLoginUser } from '../store/actions/users'
import logo from '../images/logo-gmt.png'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [error, setError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)

  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmailError(!emailRegex.test(value))
  }

  const handleSubmit = async () => {
    if (!emailError && email && password) {
      const item = { email, password }

      try {
        await getLoginUser(item)
        navigate('/home') // Redirige a la página de inicio
      } catch (err) {
        setError('Usuario y/o Contraseña inválida, intente de nuevo.')
      }
    } else {
      setError('Por favor completa todos los campos correctamente.')
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
          Iniciar Sesión
        </Header>
        <Form size="large" onSubmit={(e) => e.preventDefault()}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Correo Electrónico"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => setEmailTouched(true)} // Cambia el estado al perder el foco
              required
              error={
                emailError &&
                emailTouched && {
                  // Muestra el mensaje solo si el campo ha sido tocado
                  content: 'Por favor, escribe un correo válido.',
                  pointing: 'below',
                }
              }
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
        {error && (
          <Message error>
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
          </Message>
        )}
        <Message>
          ¿No tienes una cuenta? <a href="/register">Regístrate</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login
