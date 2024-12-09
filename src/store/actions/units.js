import Swal from 'sweetalert2'

const API_URL = process.env.REACT_APP_API_URL

export const createUnit = async (item) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/unit/create_unit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      const errorData = await response.json()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorData.message || 'Error al crear la unidad.',
      })
      throw new Error(errorData.message || 'Error al crear la unidad.')
    }

    const data = await response.json()

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Unidad creada exitosamente.',
    })

    return data
  } catch (error) {
    console.error('Error al crear la unidad:', error.message)
    throw error
  }
}

export const updateUnit = async (item) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/unit/update_unit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      const errorData = await response.json()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorData.message || 'Error al actualizar la unidad.',
      })
      throw new Error(errorData.message || 'Error al actualizar la unidad.')
    }

    const data = await response.json()

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Unidad actualizada exitosamente.',
    })

    return data
  } catch (error) {
    console.error('Error al actualizar la unidad:', error.message)
    throw error
  }
}

export const deleteUnit = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/unit/delete_unit/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorData.message || 'Error al eliminar la unidad.',
      })
      throw new Error(errorData.message || 'Error al eliminar la unidad.')
    }

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Unidad eliminada exitosamente.',
    })

    return true
  } catch (error) {
    console.error('Error al eliminar la unidad:', error.message)
    throw error
  }
}

export const getUnits = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/unit/get_units`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorData.message || 'Error al obtener las unidades.',
      })
      throw new Error(errorData.message || 'Error al obtener las unidades.')
    }

    const data = await response.json()

    return data // Devuelve los registros obtenidos
  } catch (error) {
    console.error('Error al obtener las unidades:', error.message)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un problema al intentar obtener las unidades. Por favor, inténtalo de nuevo.',
    })
    throw error
  }
}
