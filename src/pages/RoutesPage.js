import React, { useState } from 'react'
import {
  Container,
  Header,
  Segment,
  Grid,
  Form,
  Input,
  Button,
} from 'semantic-ui-react'

function RoutesPage() {
  const [formData, setFormData] = useState({
    codigoRuta: '',
    nombreRuta: '',
  })

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    console.log('Datos de la Ruta:', formData)
    // Aquí puedes enviar los datos al backend o procesarlos como sea necesario
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
              <Form.Field>
                <label>Código de la Ruta</label>
                <Input
                  placeholder="Ingresa el código de la ruta"
                  name="codigoRuta"
                  value={formData.codigoRuta}
                  onChange={handleChange}
                />
              </Form.Field>
            </Grid.Column>

            {/* Nombre de la Ruta */}
            <Grid.Column>
              <Form.Field>
                <label>Nombre de la Ruta</label>
                <Input
                  placeholder="Ingresa el nombre de la ruta"
                  name="nombreRuta"
                  value={formData.nombreRuta}
                  onChange={handleChange}
                />
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
    </Container>
  )
}

export default RoutesPage
