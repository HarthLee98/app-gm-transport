import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Grid, Icon, Segment } from 'semantic-ui-react'
import PageLayout from '../components/PageLayout'

function HomePage() {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <br />
      <Header as="h1" color="blue" textAlign="center">
        Bienvenido a GM Transport
      </Header>

      {/* Grid de Catálogos */}
      <Segment style={{ marginTop: '50px', padding: '20px' }}>
        <Grid columns={3} doubling stackable>
          {/* Catálogo de Rutas */}
          <Grid.Column textAlign="center">
            <div
              onClick={() => navigate('/routes')}
              style={{ cursor: 'pointer' }}
            >
              <Icon name="road" size="huge" color="blue" />
              <Header as="h3">Catálogo de Rutas</Header>
            </div>
          </Grid.Column>

          {/* Catálogo de Casetas */}
          <Grid.Column textAlign="center">
            <div
              onClick={() => navigate('/booths')}
              style={{ cursor: 'pointer' }}
            >
              <Icon name="building" size="huge" color="teal" />
              <Header as="h3">Catálogo de Casetas</Header>
            </div>
          </Grid.Column>

          {/* Catálogo de Unidades */}
          <Grid.Column textAlign="center">
            <div
              onClick={() => navigate('/units')}
              style={{ cursor: 'pointer' }}
            >
              <Icon name="truck" size="huge" color="orange" />
              <Header as="h3">Catálogo de Unidades</Header>
            </div>
          </Grid.Column>

          {/* Catálogo de Precios de Combustible */}
          <Grid.Column textAlign="center">
            <div
              onClick={() => navigate('/fuel_prices')}
              style={{ cursor: 'pointer' }}
            >
              <Icon name="tint" size="huge" color="black" />
              <Header as="h3">Catálogo de Precios de Combustible</Header>
            </div>
          </Grid.Column>

          {/* Generar Presupuesto */}
          <Grid.Column textAlign="center">
            <div
              onClick={() => navigate('/generate_budget')}
              style={{ cursor: 'pointer' }}
            >
              <Icon name="calculator" size="huge" color="purple" />
              <Header as="h3">Generar Presupuesto</Header>
            </div>
          </Grid.Column>

          {/* Reportes */}
          <Grid.Column textAlign="center">
            <div
              onClick={() => navigate('/reports')}
              style={{ cursor: 'pointer' }}
            >
              <Icon name="chart bar" size="huge" color="red" />
              <Header as="h3">Reportes</Header>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    </PageLayout>
  )
}

export default HomePage
