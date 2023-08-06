/* eslint-disable no-undef */
import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development' ?
    'http://localhost:3001/api/property' :
    '/api/property'

const createProperty = async (formData) => {
    const response = await axios.post(baseUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    return response.data
}

const getPropertyById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export default { createProperty, getPropertyById }