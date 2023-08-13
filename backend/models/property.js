const mongoose = require('mongoose')

let propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
    },
    description: String,
    images: [{ path: String }],
    address: {
        type: String,
        required: true,
    },
    propertyId: {
        type: String,
        required: true,
    },
    isPropertyForSale: {
        type: Boolean,
    }
})

propertySchema.set('toJSON', {
    transform: (document, requiredObject) => {
        requiredObject.id = requiredObject._id
        delete requiredObject._id
        delete requiredObject.__v
    }
})

module.exports = mongoose.model('Property', propertySchema)