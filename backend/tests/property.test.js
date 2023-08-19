const supertest = require('supertest');
const app = require('../app');
const Property = require('../models/property');
const { validProperty, incompleteProperty } = require('./property_helper');

const api = supertest(app);

describe('Property route testing', () => {
    beforeEach(async () => {
        await Property.deleteMany({});
    }, 20000);

    test('should create a new property', async () => {
        const response = await api.post('/api/property').send(validProperty).expect(201);
        const responseObject = response.body;
    })

    test('should not create a new property with incomplete data', async () => {
        await api.post('/api/property').send(incompleteProperty).expect(500);
    })

    test('should get a property by id', async () => {
        const response = await api.post('/api/property').send(validProperty).expect(201);
        const responseObject = response.body;
        const propertyId = responseObject.propertyId;
        await api.get(`/api/property/${propertyId}`).expect(200);
    })

    test('should not get a property by invalid id', async () => {
        await api.get(`/api/property/123`).expect(404);
    })

    test('should update a property by id', async () => {
        const response = await api.post('/api/property').send(validProperty).expect(201);
        const responseObject = response.body;
        const propertyId = responseObject.propertyId;
        await api.patch(`/api/property/${propertyId}`).send({ isPropertyForSale: false }).expect(200);
    })

    test('should not update a property by invalid id', async () => {
        await api.patch(`/api/property/123`).send({ isPropertyForSale: false }).expect(404);
    })

    test('should upload images', async () => {
        const response = await api.post('/api/property')
            .field('title', validProperty.title)
            .field('description', validProperty.description)
            .field('address', validProperty.address)
            .field('propertyId', validProperty.propertyId)
            .field('isPropertyForSale', validProperty.isPropertyForSale)
            .attach('images', '../uploads/default.png').expect(201);
        const responseObject = response.body;
        const propertyId = responseObject.propertyId;
        await api.get(`/api/property/${propertyId}`).expect(200);
    })

    afterAll(async () => await Property.deleteMany({}));
})