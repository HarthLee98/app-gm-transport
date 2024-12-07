const API_URL = process.env.REACT_APP_API_URL // URL base de la API

export const createLoginUser = async (item) => {
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

export const getLoginUser = async (item) => {
  try {
    const response = await fetch(`${API_URL}/user/get_user_login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al iniciar sesión')
    }

    const data = await response.json()

    // Guardar el token en localStorage
    localStorage.setItem('token', data.token)

    return data
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message)
    throw error
  }
}
