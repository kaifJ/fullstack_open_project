const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { insertUsers, usersInDb } = require('./user_helper')

const api = supertest(app)

describe('User route testing', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await insertUsers()
    })

    test('test initial number of users', async () => {
        const users = await usersInDb()
        expect(users).toHaveLength(1)
    })

    test('duplicate email is not allowed', async () => {
        const newUser = {
            username: 'root',
            name: 'Superuser',
            passwordHash: 'Password@123',
            email: 'root@gmail.com'
        }
        const response = await api.post('/api/users').send(newUser).expect(400)
    })

    test('duplicate username not allowed', async () => {
        const newUser = {
            username: 'root',
            name: 'Superuser',
            passwordHash: 'Password@123',
            email: 'asdf@gmai.com'
        }

        const resonse = await api.post('/api/users').send(newUser).expect(400)
    })

    test('password must be a string password', async () => {
        const newUser = {
            username: 'root1',
            name: 'root user',
            passwordHash: 'strong',
            email: 'asdf@gmail.com'
        }

        const response = await api.post('/api/users').send(newUser).expect(400)
    })

    test('username is required', async () => {
        const newUser = {
            name: 'root user',
            passwordHash: 'strong',
            email: 'asdf@gmail.com'
        }

        const response = await api.post('/api/users').send(newUser).expect(400)
    })

})
