/* eslint-disable no-undef */
import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development' ?
    'http://localhost:3001/api/users' :
    '/api/users'

const register = async (body) => {
    const { username, name='', email, password } = body
    const response = await axios.post(baseUrl, {
        username,
        name,
        email,
        password,
    })
    return response.data
}

export default { register }