const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const path = require('path')

require('express-async-errors')

const { userRouter, loginRouter, propertyRouter } = require('./controllers/index')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.static('build'))

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/property', propertyRouter)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({
            error: error.message
        })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    } else {
        return response.status(400).json({
            error: error.message
        })
    }

    // eslint-disable-next-line no-unreachable
    next(error)
}

app.use(errorHandler)


module.exports = app
