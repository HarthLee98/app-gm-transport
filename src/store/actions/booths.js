import Swal from 'sweetalert2'

const API_URL = process.env.REACT_APP_API_URL

export const createBooth = async (item) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/booth/create_booth`, {
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
        text: errorData.message || 'Error al crear la caseta.',
      })
      throw new Error(errorData.message || 'Error al crear la caseta.')
    }

    const data = await response.json()

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Caseta creada exitosamente.',
    })

    return data
  } catch (error) {
    console.error('Error al crear la caseta:', error.message)
    throw error
  }
}

export const updateBooth = async (item) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/booth/update_booth`, {
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
        text: errorData.message || 'Error al actualizar la caseta.',
      })
      throw new Error(errorData.message || 'Error al actualizar la caseta.')
    }

    const data = await response.json()

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Caseta actualizada exitosamente.',
    })

    return data
  } catch (error) {
    console.error('Error al actualizar la caseta:', error.message)
    throw error
  }
}

export const deleteBooth = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/booth/delete_booth/${id}`, {
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
        text: errorData.message || 'Error al eliminar la caseta.',
      })
      throw new Error(errorData.message || 'Error al eliminar la caseta.')
    }

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Caseta eliminada exitosamente.',
    })

    return true
  } catch (error) {
    console.error('Error al eliminar la caseta:', error.message)
    throw error
  }
}

export const getBooths = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/booth/get_booths`, {
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
        text: errorData.message || 'Error al obtener las casetas.',
      })
      throw new Error(errorData.message || 'Error al obtener las casetas.')
    }

    const data = await response.json()

    return data // Devuelve los registros obtenidos
  } catch (error) {
    console.error('Error al obtener las casetas:', error.message)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un problema al intentar obtener las casetas. Por favor, inténtalo de nuevo.',
    })
    throw error
  }
}
