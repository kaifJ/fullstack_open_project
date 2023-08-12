const propertyRouter = require('express').Router()
const Property = require('../models/property')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './uploads')
    },
    filename: (request, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({ storage })

propertyRouter.post('/', upload.array('images', 3), async (request, response) => {
    try {
        const { title, price, description, address, propertyId, propertyOwner } = request.body

        // Create a new Property document with the image file names
        const propertyData = new Property({
            title,
            price,
            description,
            address,
            propertyId,
            propertyOwner,
        })

        request.files?.forEach(file => {
            console.log(file.path)
            propertyData.images.push({ path: file.path })
        })

        // Save the document
        await propertyData.save()

        response.status(201).json(propertyData)
    } catch (error) {
        response.status(500).json({ message: 'Error uploading property', error: error.message })
    }
})

propertyRouter.get('/:propertyId', async (request, response) => {
    try {
        const { propertyId } = request.params
        const property = await Property.findOne({ propertyId })
        if (!property) {
            return response.status(404).json({ message: 'Property not found' })
        }
        response.status(200).json(property)
    } catch (error) {
        response.status(500).json({ message: 'Error getting properties', error: error.message })
    }
})

module.exports = propertyRouter