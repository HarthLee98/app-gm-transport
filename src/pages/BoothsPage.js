import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header, Segment, Grid, Form, Input, Button } from 'semantic-ui-react'
import { createBooth, updateBooth } from '../store/actions/booths' // Acciones para Casetas
import PageLayout from '../components/PageLayout'

function BoothsPage() {
  const location = useLocation()
  const boothData = location.state?.item // Datos de la caseta para edición

  const [formData, setFormData] = useState({
    code: boothData?.code || '',
    name: boothData?.name || '',
  })
  const [errors, setErrors] = useState({})
  const [isEditMode, setIsEditMode] = useState(!!boothData)

  useEffect(() => {
    if (boothData) {
      setFormData(boothData)
    }
  }, [boothData])

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: false })
  }

  const validateFields = () => {
    const newErrors = {}
    if (!formData.code.trim()) {
      newErrors.code = 'El código de la caseta es obligatorio.'
    }
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre de la caseta es obligatorio.'
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
          // Actualizar caseta
          await updateBooth(formData)
          console.log('Caseta actualizada:', formData)
          setFormData({ code: '', name: '' })
          setIsEditMode(false)
        } else {
          // Crear nueva caseta
          await createBooth(formData)
          setFormData({ code: '', name: '' })
        }
      } catch (error) {
        console.error('Error al guardar la caseta:', error.message)
      }
    }
  }

  return (
    <PageLayout>
      <br />
      <Header as="h1" color="teal">
        Catálogo de Casetas
      </Header>
      <Segment style={{ marginTop: '20px', padding: '30px' }}>
        <Form>
          <Grid columns={2} doubling stackable>
            {/* Código de la Caseta */}
            <Grid.Column>
              <Form.Field error={!!errors.code}>
                <label>Código de la Caseta</label>
                <Input
                  placeholder="Ingresa el código de la caseta"
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

            {/* Nombre de la Caseta */}
            <Grid.Column>
              <Form.Field error={!!errors.name}>
                <label>Nombre de la Caseta</label>
                <Input
                  placeholder="Ingresa el nombre de la caseta"
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
              color="teal"
              onClick={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              {isEditMode ? 'Actualizar Caseta' : 'Guardar Caseta'}
            </Button>
          </div>
        </Form>
      </Segment>
    </PageLayout>
  )
}

export default BoothsPage
