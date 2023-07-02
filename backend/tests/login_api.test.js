const mongooser = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { initialUser } = require('./login_helper');

const api = supertest(app);

describe('Login route testing', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await api.post('/api/users').send(initialUser)
    }, 10000);

    test('login with username', async () => {
        const user = {
            username: 'root user',
            password: 'Rootuser@123'
        };

        const response = await api.post('/api/login').send(user).expect(200);
        const responseObject = response.body;
        expect(responseObject.token).toBeDefined();
        
    })

    test('login with email', async () => {
        const user = {
            email: 'root@gmail.com',
            password: 'Rootuser@123'
        };

        const response = await api.post('/api/login').send(user).expect(200);
        const responseObject = response.body;
        expect(responseObject.token).toBeDefined();
    })

    test('shold not login with invalid username', async () => {
        const user = {
            username: 'testuser',
            password: 'Rootuser@123'
        }

        await api.post('/api/login').send(user).expect(401);
    })

    test('shold not login with invalid email', async () => {
        const user = {
            email: 'testuser@gmail.com',
            password: 'Rootuser@123'
        }

        await api.post('/api/login').send(user).expect(401);
    })
});