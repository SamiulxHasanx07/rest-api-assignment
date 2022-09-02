const users = require('../user.json')

// Get all users
module.exports.getAllUsers = (req, res, next) => {
    res.send(users)
}

// get user by random id
module.exports.getUserById = (req, res, next) => {
    const { id } = req.params;
    const singleUser = users.find(user => user.id == id);
    res.send(singleUser)
}

// save a user
module.exports.saveUser = (req, res, next) => {

}