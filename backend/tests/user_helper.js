const User = require('../models/user')

const initialUsers = [
    { username: 'root', name: 'Superuser', passwordHash: 'Password@123', email: 'root@gmail.com' }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const insertUsers = async () => {
    const users = initialUsers.map(user => new User(user))
    const promises = users.map(user => user.save())
    await Promise.all(promises)
}

module.exports = {
    insertUsers,
    usersInDb
}