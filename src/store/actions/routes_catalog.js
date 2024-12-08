import Swal from 'sweetalert2'

const API_URL = process.env.REACT_APP_API_URL

export const createRoute = async (item) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/route/create_route`, {
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
        text: errorData.message || 'Error al crear la ruta.',
      })
      throw new Error(errorData.message || 'Error al crear la ruta.')
    }

    const data = await response.json()

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Ruta creada exitosamente.',
    })

    return data
  } catch (error) {
    console.error('Error al crear la ruta:', error.message)
    throw error
  }
}

export const updateRoute = async (item) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/route/update_route`, {
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
        text: errorData.message || 'Error al actualizar la ruta.',
      })
      throw new Error(errorData.message || 'Error al actualizar la ruta.')
    }

    const data = await response.json()

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Ruta actualizada exitosamente.',
    })

    return data
  } catch (error) {
    console.error('Error al actualizar la ruta:', error.message)
    throw error
  }
}

export const getRoutes = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/route/get_routes`, {
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
        text: errorData.message || 'Error al obtener las rutas.',
      })
      throw new Error(errorData.message || 'Error al obtener las rutas.')
    }

    const data = await response.json()

    return data // Devuelve los registros obtenidos
  } catch (error) {
    console.error('Error al obtener las rutas:', error.message)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un problema al intentar obtener las rutas. Por favor, inténtalo de nuevo.',
    })
    throw error
  }
}
