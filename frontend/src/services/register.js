import axios from 'axios'
import env from 'react-dotenv'

const baseUrl = env.BASE_URL ? `${env.BASE_URL}/api/register` :  '/api/register'

const register = async (body) => {
    const { username, name, email, password } = body
    const response = await axios.post(baseUrl, {
        username,
        name,
        email,
        password,
    })
    return response.data
}

export default { register }