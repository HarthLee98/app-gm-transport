import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header, Segment, Grid, Form, Input, Button } from 'semantic-ui-react'
import { createUnit, updateUnit } from '../store/actions/units' // Acciones para Unidades
import PageLayout from '../components/PageLayout'

function UnitsPage() {
  const location = useLocation()
  const unitData = location.state?.item // Datos de la unidad para edición

  const [formData, setFormData] = useState({
    code: unitData?.code || '',
    name: unitData?.name || '',
  })
  const [errors, setErrors] = useState({})
  const [isEditMode, setIsEditMode] = useState(!!unitData)

  useEffect(() => {
    if (unitData) {
      setFormData(unitData)
    }
  }, [unitData])

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: false })
  }

  const validateFields = () => {
    const newErrors = {}
    if (!formData.code.trim()) {
      newErrors.code = 'El código de la unidad es obligatorio.'
    }
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre de la unidad es obligatorio.'
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
          // Actualizar unidad
          await updateUnit(formData)
          console.log('Unidad actualizada:', formData)
          setFormData({ code: '', name: '' })
          setIsEditMode(false)
        } else {
          // Crear nueva unidad
          await createUnit(formData)
          setFormData({ code: '', name: '' })
        }
      } catch (error) {
        console.error('Error al guardar la unidad:', error.message)
      }
    }
  }

  return (
    <PageLayout>
      <br />
      <Header as="h1" color="orange">
        Catálogo de Unidades
      </Header>
      <Segment style={{ marginTop: '20px', padding: '30px' }}>
        <Form>
          <Grid columns={2} doubling stackable>
            {/* Código de la Unidad */}
            <Grid.Column>
              <Form.Field error={!!errors.code}>
                <label>Código de la Unidad</label>
                <Input
                  placeholder="Ingresa el código de la unidad"
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

            {/* Nombre de la Unidad */}
            <Grid.Column>
              <Form.Field error={!!errors.name}>
                <label>Nombre de la Unidad</label>
                <Input
                  placeholder="Ingresa el nombre de la unidad"
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
              color="orange"
              onClick={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              {isEditMode ? 'Actualizar Unidad' : 'Guardar Unidad'}
            </Button>
          </div>
        </Form>
      </Segment>
    </PageLayout>
  )
}

export default UnitsPage
