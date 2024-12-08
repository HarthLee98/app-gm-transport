import React, { useState, useEffect } from 'react'
import {
  Header,
  Tab,
  Table,
  Popup,
  Icon,
  Modal,
  Button,
} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { getRoutes, deleteRoute } from '../store/actions/routes_catalog' // Importa la acción de eliminar
import PageLayout from '../components/PageLayout'

function ReportsPage() {
  const [routes, setRoutes] = useState([]) // Estado para almacenar las rutas
  const [modalOpen, setModalOpen] = useState(false) // Estado para el modal
  const [selectedRoute, setSelectedRoute] = useState(null) // Ruta seleccionada para eliminar
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

  // Maneja la apertura del modal
  const handleOpenModal = (route) => {
    setSelectedRoute(route)
    setModalOpen(true)
  }

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setSelectedRoute(null)
    setModalOpen(false)
  }

  // Maneja la confirmación de eliminación
  const handleDelete = async () => {
    try {
      // Llama a la acción para eliminar la ruta
      await deleteRoute(selectedRoute.id)

      // Actualiza el estado local eliminando la ruta
      setRoutes((prevRoutes) =>
        prevRoutes.filter((route) => route.id !== selectedRoute.id)
      )

      // Cierra el modal
      handleCloseModal()
    } catch (error) {
      console.error('Error al eliminar la ruta:', error.message)
    }
  }

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
                    onClick={() => handleOpenModal(route)} // Abre el modal con la ruta seleccionada
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

      {/* Modal de confirmación */}
      <Modal open={modalOpen} onClose={handleCloseModal} size="tiny">
        <Modal.Header>Confirmar Eliminación</Modal.Header>
        <Modal.Content>
          <p>
            ¿Estás seguro de que deseas eliminar la ruta "{selectedRoute?.name}
            "?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button positive onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal.Actions>
      </Modal>
    </PageLayout>
  )
}

export default ReportsPage
