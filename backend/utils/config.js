require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const PORT = process.env.PORT
const JWT_SECRET = process.env.NODE_ENV === 'test' ?
    'testjwtsecret':
    process.env.JWT_SECRET

module.exports = {
    MONGODB_URI,
    JWT_SECRET,
    PORT
}