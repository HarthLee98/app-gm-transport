import React, { useState, useEffect } from 'react'
import { Header, Tab, Table, Popup, Icon } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { getRoutes } from '../store/actions/routes_catalog' // Importa la acción
import PageLayout from '../components/PageLayout'

function ReportsPage() {
  const [routes, setRoutes] = useState([]) // Estado para almacenar las rutas
  const navigate = useNavigate() // Hook para redirigir

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoutes()
        setRoutes(data) // Actualiza el estado con las rutas obtenidas
      } catch (error) {
        console.error('Error al obtener rutas:', error.message)
      }
    }

    fetchData()
  }, [])

  // Contenido de la pestaña de rutas
  const routesPane = (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
          <Table.HeaderCell>Código</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {routes.map((route) => (
          <Table.Row key={route.id}>
            <Table.Cell>
              {/* Botón de Editar */}
              <Popup
                content="Editar"
                trigger={
                  <Icon
                    name="edit"
                    color="blue"
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => navigate('/routes', { state: { route } })} // Redirige con datos de la ruta
                  />
                }
              />
              {/* Botón de Eliminar */}
              <Popup
                content="Eliminar"
                trigger={
                  <Icon
                    name="trash alternate"
                    color="red"
                    style={{ cursor: 'pointer' }}
                    onClick={() => console.log('Eliminar:', route.id)} // Aquí pondrás la función de eliminar
                  />
                }
              />
            </Table.Cell>
            <Table.Cell>{route.code}</Table.Cell>
            <Table.Cell>{route.name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )

  const panes = [
    { menuItem: 'Rutas', render: () => <>{routesPane}</> },
    { menuItem: 'Casetas', render: () => <></> },
    { menuItem: 'Unidades', render: () => <></> },
    { menuItem: 'Precios de combustible', render: () => <></> },
    { menuItem: 'Presupuestos', render: () => <></> },
    // Puedes agregar más pestañas aquí como necesites
  ]

  return (
    <PageLayout>
      <br />
      <Header as="h1" color="red">
        Reportes
      </Header>
      <Tab panes={panes} menu={{ secondary: true, pointing: true }} />
    </PageLayout>
  )
}

export default ReportsPage
