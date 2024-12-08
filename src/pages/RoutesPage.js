import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header, Segment, Grid, Form, Input, Button } from 'semantic-ui-react'
import { createRoute, updateRoute } from '../store/actions/routes_catalog'
import PageLayout from '../components/PageLayout'

function RoutesPage() {
  const location = useLocation()
  const routeData = location.state?.route // Datos de la ruta para edición

  const [formData, setFormData] = useState({
    code: routeData?.code || '',
    name: routeData?.name || '',
  })
  const [errors, setErrors] = useState({}) // Estado para almacenar errores
  const [isEditMode, setIsEditMode] = useState(!!routeData)

  useEffect(() => {
    if (routeData) {
      setFormData(routeData)
    }
  }, [routeData])

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
        if (isEditMode) {
          // Llamar a la acción para actualizar la ruta
          await updateRoute(formData)
          console.log('Ruta actualizada:', formData)
          setFormData({ code: '', name: '' }) // Limpia los campos después de actualizar
          setIsEditMode(false) // Salir del modo de edición
        } else {
          await createRoute(formData) // Llama a la acción para crear una nueva ruta
          setFormData({ code: '', name: '' }) // Limpia los campos del formulario
        }
      } catch (error) {
        console.error('Error al guardar la ruta:', error.message)
      }
    }
  }

  return (
    <PageLayout>
      <br />
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

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              color="blue"
              onClick={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              {isEditMode ? 'Actualizar Ruta' : 'Guardar Ruta'}
            </Button>
          </div>
        </Form>
      </Segment>
    </PageLayout>
  )
}

export default RoutesPage
