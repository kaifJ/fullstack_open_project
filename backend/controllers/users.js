const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { isStrongPassword } = require('validator')

userRouter.post('/', async (request, response) => {
    const body = request.body

    if (!isStrongPassword(body.password)) {
        return response.status(400).json({
            error: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
        })
    }

    const userExists = await User.findOne({ username: body.username })
    if (userExists) {
        return response.status(400).json({
            error: 'Username already exists'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        email: body.email
    })

    if(process.env.NODE_ENV === 'test') user['_id'] = body['_id']

    const savedUser = await user.save()
    response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.status(200).json(users)
})

userRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await User.findByIdAndRemove(id)
    response.status(204).end()
})

userRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = userRouter

