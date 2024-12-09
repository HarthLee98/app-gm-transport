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
import { getRoutes, deleteRoute } from '../store/actions/routes_catalog'
import { getBooths, deleteBooth } from '../store/actions/booths'
import { getUnits, deleteUnit } from '../store/actions/units'
import PageLayout from '../components/PageLayout'

function ReportsPage() {
  const [routes, setRoutes] = useState([])
  const [booths, setBooths] = useState([])
  const [units, setUnits] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const routesData = await getRoutes()
        setRoutes(routesData)
        const boothsData = await getBooths()
        setBooths(boothsData)
        const unitsData = await getUnits()
        setUnits(unitsData)
      } catch (error) {
        console.error('Error al obtener datos:', error.message)
      }
    }

    fetchData()
  }, [])

  const handleOpenModal = (item, type) => {
    setSelectedItem({ ...item, type })
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
    setModalOpen(false)
  }

  const handleDelete = async () => {
    try {
      if (selectedItem?.type === 'route') {
        await deleteRoute(selectedItem.id)
        setRoutes((prev) =>
          prev.filter((route) => route.id !== selectedItem.id)
        )
      } else if (selectedItem?.type === 'booth') {
        await deleteBooth(selectedItem.id)
        setBooths((prev) =>
          prev.filter((booth) => booth.id !== selectedItem.id)
        )
      } else if (selectedItem?.type === 'unit') {
        await deleteUnit(selectedItem.id)
        setUnits((prev) => prev.filter((unit) => unit.id !== selectedItem.id))
      }
      handleCloseModal()
    } catch (error) {
      console.error('Error al eliminar:', error.message)
    }
  }

  const renderTable = (data, type) => (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
          <Table.HeaderCell>Código</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>
              <Popup
                content="Editar"
                trigger={
                  <Icon
                    name="edit"
                    color="blue"
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => navigate(`/${type}s`, { state: { item } })}
                  />
                }
              />
              <Popup
                content="Eliminar"
                trigger={
                  <Icon
                    name="trash alternate"
                    color="red"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleOpenModal(item, type)}
                  />
                }
              />
            </Table.Cell>
            <Table.Cell>{item.code}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )

  const panes = [
    { menuItem: 'Rutas', render: () => renderTable(routes, 'route') },
    { menuItem: 'Casetas', render: () => renderTable(booths, 'booth') },
    { menuItem: 'Unidades', render: () => renderTable(units, 'unit') },
    { menuItem: 'Precios de combustible', render: () => <></> },
    { menuItem: 'Presupuestos', render: () => <></> },
  ]

  return (
    <PageLayout>
      <br />
      <Header as="h1" color="red">
        Reportes
      </Header>
      <Tab panes={panes} menu={{ secondary: true, pointing: true }} />

      <Modal open={modalOpen} onClose={handleCloseModal} size="tiny">
        <Modal.Header>Confirmar Eliminación</Modal.Header>
        <Modal.Content>
          <p>
            ¿Estás seguro de que deseas eliminar{' '}
            {selectedItem?.type === 'route'
              ? 'la ruta'
              : selectedItem?.type === 'booth'
              ? 'la caseta'
              : 'la unidad'}{' '}
            "{selectedItem?.name}"?
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
