import React, { useState, useEffect } from 'react'
import {
  Header,
  Segment,
  Grid,
  Form,
  Dropdown,
  Input,
  Button,
  Message,
} from 'semantic-ui-react'
import PageLayout from '../components/PageLayout'

const GenerateBudgetPage = () => {
  const [formData, setFormData] = useState({
    travel_type: '',
    one_way_route: '',
    return_route: '',
    departure_date_time: '',
    return_date_time: '',
    quantity_passengers: '',
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true) // Estado para deshabilitar el botón

  const travelTypeOpts = [
    { text: 'Una Dirección', value: 'Una Dirección' },
    { text: 'Viaje Redondo', value: 'Viaje Redondo' },
  ]

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: false }) // Limpiar error al escribir
  }

  const validateFields = () => {
    const newErrors = {}
    if (!formData.travel_type) {
      newErrors.travel_type = 'El tipo de viaje es obligatorio.'
    }
    if (!formData.one_way_route.trim()) {
      newErrors.one_way_route = 'La ruta de ida es obligatoria.'
    }
    if (
      formData.travel_type === 'Viaje Redondo' &&
      !formData.return_route.trim()
    ) {
      newErrors.return_route =
        'La ruta de regreso es obligatoria para un viaje redondo.'
    }
    if (!formData.departure_date_time) {
      newErrors.departure_date_time =
        'La fecha y hora de partida son obligatorias.'
    }
    if (
      formData.travel_type === 'Viaje Redondo' &&
      !formData.return_date_time
    ) {
      newErrors.return_date_time =
        'La fecha y hora de regreso son obligatorias para un viaje redondo.'
    }
    if (!formData.quantity_passengers || isNaN(formData.quantity_passengers)) {
      newErrors.quantity_passengers =
        'La cantidad de pasajeros es obligatoria y debe ser un número.'
    } else if (formData.quantity_passengers <= 0) {
      newErrors.quantity_passengers =
        'La cantidad de pasajeros debe ser mayor a 0.'
    }
    return newErrors
  }

  const handleSubmit = () => {
    const validationErrors = validateFields()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccess(false)
    } else {
      console.log('Datos del formulario:', formData)
      setErrors({})
      setSuccess(true) // Mostrar mensaje de éxito
      // Aquí puedes enviar los datos al backend o procesarlos como sea necesario
    }
  }

  useEffect(() => {
    const validationErrors = validateFields()
    setIsSubmitDisabled(Object.keys(validationErrors).length > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  return (
    <PageLayout>
      <Header as="h1" color="purple">
        Generar Presupuesto
      </Header>
      <Segment style={{ marginTop: '20px', padding: '30px' }}>
        <Form>
          <Grid columns={2} doubling stackable>
            {/* Tipo de Viaje */}
            <Grid.Column>
              <Form.Field error={!!errors.travel_type}>
                <label>Tipo de Viaje</label>
                <Dropdown
                  placeholder="Selecciona el tipo de viaje"
                  fluid
                  selection
                  options={travelTypeOpts}
                  name="travel_type"
                  value={formData.travel_type}
                  onChange={handleChange}
                />
                {errors.travel_type && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '5px',
                      fontSize: '0.9em',
                    }}
                  >
                    {errors.travel_type}
                  </div>
                )}
              </Form.Field>
            </Grid.Column>

            {/* Ruta de Ida */}
            <Grid.Column>
              <Form.Field error={!!errors.one_way_route}>
                <label>Ruta de Ida</label>
                <Input
                  placeholder="Ingresa la ruta de ida"
                  name="one_way_route"
                  value={formData.one_way_route}
                  onChange={handleChange}
                />
                {errors.one_way_route && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '5px',
                      fontSize: '0.9em',
                    }}
                  >
                    {errors.one_way_route}
                  </div>
                )}
              </Form.Field>
            </Grid.Column>

            {/* Ruta de Regreso */}
            <Grid.Column>
              <Form.Field error={!!errors.return_route}>
                <label>Ruta de Regreso (si aplica)</label>
                <Input
                  placeholder="Ingresa la ruta de regreso"
                  name="return_route"
                  value={formData.return_route}
                  onChange={handleChange}
                  disabled={formData.travel_type !== 'Viaje Redondo'}
                />
                {errors.return_route && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '5px',
                      fontSize: '0.9em',
                    }}
                  >
                    {errors.return_route}
                  </div>
                )}
              </Form.Field>
            </Grid.Column>

            {/* Fecha y Hora de Partida */}
            <Grid.Column>
              <Form.Field error={!!errors.departure_date_time}>
                <label>Fecha y Hora de Partida</label>
                <Input
                  type="datetime-local"
                  name="departure_date_time"
                  value={formData.departure_date_time}
                  onChange={handleChange}
                />
                {errors.departure_date_time && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '5px',
                      fontSize: '0.9em',
                    }}
                  >
                    {errors.departure_date_time}
                  </div>
                )}
              </Form.Field>
            </Grid.Column>

            {/* Fecha y Hora de Regreso */}
            <Grid.Column>
              <Form.Field error={!!errors.return_date_time}>
                <label>Fecha y Hora de Regreso</label>
                <Input
                  type="datetime-local"
                  name="return_date_time"
                  value={formData.return_date_time}
                  onChange={handleChange}
                  disabled={formData.travel_type !== 'Viaje Redondo'}
                />
                {errors.return_date_time && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '5px',
                      fontSize: '0.9em',
                    }}
                  >
                    {errors.return_date_time}
                  </div>
                )}
              </Form.Field>
            </Grid.Column>

            {/* Cantidad de Pasajeros */}
            <Grid.Column>
              <Form.Field error={!!errors.quantity_passengers}>
                <label>Cantidad de Pasajeros</label>
                <Input
                  type="number"
                  placeholder="Ingresa la cantidad de pasajeros"
                  name="quantity_passengers"
                  value={formData.quantity_passengers}
                  onChange={handleChange}
                />
                {errors.quantity_passengers && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '5px',
                      fontSize: '0.9em',
                    }}
                  >
                    {errors.quantity_passengers}
                  </div>
                )}
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Button
            color="purple"
            onClick={handleSubmit}
            disabled={isSubmitDisabled} // Botón deshabilitado hasta que el formulario sea válido
            style={{ marginTop: '20px' }}
          >
            Generar Presupuesto
          </Button>

          {success && (
            <Message
              success
              header="Presupuesto generado con éxito"
              content="Los datos han sido enviados correctamente."
              style={{ marginTop: '20px' }}
            />
          )}
        </Form>
      </Segment>
    </PageLayout>
  )
}

export default GenerateBudgetPage
