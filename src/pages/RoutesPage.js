import React, { useState } from 'react'
import { Header, Segment, Grid, Form, Input, Button } from 'semantic-ui-react'
import { createRoute } from '../store/actions/routes_catalog'
import PageLayout from '../components/PageLayout'

function RoutesPage() {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
  })
  const [errors, setErrors] = useState({}) // Estado para almacenar errores

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

  const handleSubmit = async () => {
    const validationErrors = validateFields()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      try {
        await createRoute(formData) // Llama a la acción con los datos del formulario
        setFormData({ code: '', name: '' }) // Limpia los campos del formulario
      } catch (error) {
        console.error('Error al guardar la ruta:', error.message)
      }
    }
  }

  return (
    <PageLayout>
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
        </Form>
      </Segment>
    </PageLayout>
  )
}

export default RoutesPage
