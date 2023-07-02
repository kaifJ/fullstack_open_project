const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    // const emailQuery = body.email ? { email: body.email } : {}
    // const usernameQuery = body.username ? { username: body.username } : null

    // const user = await User.findOne({ $or: [emailQuery, usernameQuery] })

    const user = body.email ?
        await User.findOne({ email: body.email }) :
        await User.findOne({ username: body.username })

    const isPasswordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
    if(!isPasswordCorrect || !user) {
        return response.status(401).json({
            error: 'Invalid email/username or password'
        })
    }

    const userTokenInfo = {
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(userTokenInfo, config.SECRET)
    return response.status(200).json({
        token,
        email: user.email,
        username: user.username,
    })
})

module.exports = loginRouter