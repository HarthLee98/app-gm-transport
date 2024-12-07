const API_URL = process.env.REACT_APP_API_URL // URL base de la API

export const createUser = async (item) => {
  try {
    const response = await fetch(`${API_URL}/user/create_login_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear el usuario')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al crear usuario:', error.message)
    throw error
  }
}
