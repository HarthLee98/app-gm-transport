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
