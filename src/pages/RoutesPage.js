import React, { useState } from 'react'
import {
  Container,
  Header,
  Segment,
  Grid,
  Form,
  Input,
  Button,
  Message,
} from 'semantic-ui-react'

function RoutesPage() {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
  })
  const [errors, setErrors] = useState({}) // Estado para almacenar errores
  const [success, setSuccess] = useState(false) // Estado para mostrar éxito

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: false }) // Limpiar error al escribir
  }

  const validateFields = () => {
    const newErrors = {}
    if (!formData.code.trim()) {
      newErrors.code = 'El código de la ruta es obligatorio.'
    }
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre de la ruta es obligatorio.'
    }
    return newErrors
  }

  const handleSubmit = () => {
    const validationErrors = validateFields()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccess(false)
    } else {
      console.log('Datos de la Ruta:', formData)
      setErrors({})
      setSuccess(true) // Muestra mensaje de éxito
      // Aquí puedes enviar los datos al backend o procesarlos como sea necesario
    }
  }

  return (
    <Container textAlign="center" style={{ marginTop: '50px' }}>
      <Header as="h1" color="blue">
        Catálogo de Rutas
      </Header>
      <Segment style={{ marginTop: '20px', padding: '30px' }}>
        <Form>
          <Grid columns={2} doubling stackable>
            {/* Código de la Ruta */}
            <Grid.Column>
              <Form.Field error={!!errors.code}>
                <label>Código de la Ruta</label>
                <Input
                  placeholder="Ingresa el código de la ruta"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                />
                {errors.code && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '5px',
                      fontSize: '0.9em',
                    }}
                  >
                    {errors.code}
                  </div>
                )}
              </Form.Field>
            </Grid.Column>

            {/* Nombre de la Ruta */}
            <Grid.Column>
              <Form.Field error={!!errors.name}>
                <label>Nombre de la Ruta</label>
                <Input
                  placeholder="Ingresa el nombre de la ruta"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '5px',
                      fontSize: '0.9em',
                    }}
                  >
                    {errors.name}
                  </div>
                )}
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Button
            color="blue"
            onClick={handleSubmit}
            style={{ marginTop: '20px' }}
          >
            Guardar Ruta
          </Button>

          {success && (
            <Message
              success
              header="Ruta guardada con éxito"
              content="Los datos de la ruta se han almacenado correctamente."
              style={{ marginTop: '20px' }}
            />
          )}
        </Form>
      </Segment>
    </Container>
  )
}

export default RoutesPage
