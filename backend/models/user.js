const mongoose = require('mongoose')
const { isEmail } = require('validator')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [isEmail, 'Please enter a valid email address'],
    }
})

userSchema.set('toJSON', {
    transform: (document, requiredObject) => {
        requiredObject.id = requiredObject._id
        delete requiredObject._id
        delete requiredObject.__v
        delete requiredObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)