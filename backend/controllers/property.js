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
        const { title, description, address, propertyId, isPropertyForSale = true } = request.body

        // Create a new Property document with the image file names
        const propertyData = new Property({
            title,
            description,
            address,
            propertyId,
            isPropertyForSale,
        })

        request.files?.forEach(file => {
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

propertyRouter.patch('/:propertyId', async (request, response) => {
    try {
        const { propertyId } = request.params
        const { isPropertyForSale } = request.body

        const property = await Property.findOne({ propertyId })
        if (!property) {
            return response.status(404).json({ message: 'Property not found' })
        }

        property.isPropertyForSale = isPropertyForSale

        await property.save()

        response.status(200).json(property)
    } catch (error) {
        response.status(500).json({ message: 'Error updating property', error: error.message })
    }
})

module.exports = propertyRouter