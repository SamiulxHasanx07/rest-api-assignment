const users = require('../user.json');
const fs = require('fs');
const e = require('express');

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
    let userArr = [];
    const reqId = req.body.id;
    const reqData = req.body;
    const dataRes = fs.readFileSync('user.json');

    if (dataRes.length > 0) {
        const usersData = JSON.parse(dataRes);
        const idExists = usersData.find(user => user.id == reqId);
        if (idExists) {
            res.send('Sorry!! Id is already exists! Please enter an Unique id and try again');
        }

        if (!idExists) {
            userArr.push(...usersData, reqData);
            fs.writeFileSync('user.json', JSON.stringify(userArr));
            res.send(`Successfully new user ${reqData.name} Added`);
        }
    } else {
        userArr.push(reqData);
        fs.writeFileSync('user.json', JSON.stringify(userArr));
        res.send(`Successfully new user ${reqData.name} Added`);
    }
}

module.exports.deleteUserById = (req, res, next) => {
    const { id } = req.params;
    const dataRes = fs.readFileSync('user.json');

    if (dataRes.length > 0) {
        const usersData = JSON.parse(dataRes);
        const idValidation = usersData.find(user => user.id == id);
        if (idValidation) {
            const finalData = usersData.filter(user => user.id != id);
            fs.writeFileSync('user.json', JSON.stringify(finalData));
            res.send(`Successfully remove ${idValidation.name} from database!!`);
        } else {
            res.send('Id is not valid!! Enter an valid id.')
        }

    } else {
        console.log("File is empty, You have to add data before execute the delete operation.");
    }

}