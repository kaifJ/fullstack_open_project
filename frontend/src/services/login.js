/* eslint-disable no-undef */
import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development' ?
    'http://localhost:3001/api/login' :
    '/api/login'

const login = async ({ email, password }) => {
    const response = await axios.post(baseUrl, {
        email,
        password,
    })
    return response.data
}

export default { login }