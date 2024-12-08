import React from 'react'
import { Container, Header } from 'semantic-ui-react'

function GenerateBudget() {
  return (
    <Container textAlign="center" style={{ marginTop: '50px' }}>
      <Header as="h1" color="purple">
        Generar Presupuesto
      </Header>
      <p>Contenido para Generar Presupuesto.</p>
    </Container>
  )
}

export default GenerateBudget
