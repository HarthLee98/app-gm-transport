import React, { useState } from 'react'
import {
  Container,
  Header,
  Segment,
  Grid,
  Form,
  Dropdown,
  Input,
  Button,
} from 'semantic-ui-react'

const GenerateBudgetPage = () => {
  const [formData, setFormData] = useState({
    travel_type: '',
    one_way_route: '',
    return_route: '',
    departure_date_time: '',
    return_date_time: '',
  })

  const travelTypeOpts = [
    { text: 'Una Dirección', value: 'Una Dirección' },
    { text: 'Viaje Redondo', value: 'Viaje Redondo' },
  ]

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData)
    // Aquí puedes enviar los datos al backend o procesarlos como sea necesario
  }

  return (
    <Container textAlign="center" style={{ marginTop: '50px' }}>
      <Header as="h1" color="purple">
        Generar Presupuesto
      </Header>
      <Segment style={{ marginTop: '20px', padding: '30px' }}>
        <Form>
          <Grid columns={2} doubling stackable>
            {/* Tipo de Viaje */}
            <Grid.Column>
              <Form.Field>
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
              </Form.Field>
            </Grid.Column>

            {/* Ruta de Ida */}
            <Grid.Column>
              <Form.Field>
                <label>Ruta de Ida</label>
                <Input
                  placeholder="Ingresa la ruta de ida"
                  name="one_way_route"
                  value={formData.one_way_route}
                  onChange={handleChange}
                />
              </Form.Field>
            </Grid.Column>

            {/* Ruta de Regreso */}
            <Grid.Column>
              <Form.Field>
                <label>Ruta de Regreso (si aplica)</label>
                <Input
                  placeholder="Ingresa la ruta de regreso"
                  name="return_route"
                  value={formData.return_route}
                  onChange={handleChange}
                  disabled={formData.travel_type !== 'Viaje Redondo'}
                />
              </Form.Field>
            </Grid.Column>

            {/* Fecha y Hora de Partida */}
            <Grid.Column>
              <Form.Field>
                <label>Fecha y Hora de Partida</label>
                <Input
                  type="datetime-local"
                  name="departure_date_time"
                  value={formData.departure_date_time}
                  onChange={handleChange}
                />
              </Form.Field>
            </Grid.Column>

            {/* Fecha y Hora de Regreso */}
            <Grid.Column>
              <Form.Field>
                <label>Fecha y Hora de Regreso</label>
                <Input
                  type="datetime-local"
                  name="return_date_time"
                  value={formData.return_date_time}
                  onChange={handleChange}
                  disabled={formData.travel_type !== 'Viaje Redondo'}
                />
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Button
            color="purple"
            onClick={handleSubmit}
            style={{ marginTop: '20px' }}
          >
            Generar Presupuesto
          </Button>
        </Form>
      </Segment>
    </Container>
  )
}

export default GenerateBudgetPage
