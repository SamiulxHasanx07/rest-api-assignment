const fs = require('fs');

const allUsers = fs.readFileSync('user.json');
const usersList = JSON.parse(allUsers);

// Get all users
module.exports.getAllUsers = (req, res, next) => {
    const { limit } = req.query;
    if (limit) {
        res.status(200).send({
            success: true,
            numberOfLimit: limit,
            data: usersList.slice(0, limit)
        })
    } else {
        res.status(200).send(usersList)
    }
}

// get user by random id
module.exports.getUserById = (req, res, next) => {
    const { id } = req.params;
    const singleUser = usersList.find(user => user.id == id);

    if (singleUser) {
        res.status(200).send(singleUser);
    } else {
        res.status(404).send({
            success: false,
            message: 'User not found, Please Enter Valid User Id!!'
        });
    }
}

// save a user
module.exports.saveUser = (req, res, next) => {
    let userArr = [];
    const { id } = req.body;
    const reqData = req.body;

    if (usersList.length > 0) {
        const idExists = usersList.find(user => user.id == id);
        if (idExists) {
            res.status(409).send({
                success: false,
                message: 'Sorry!! Id is already exists! Please enter an Unique id and try again'
            });
        }

        if (!idExists) {
            userArr.push(...usersList, reqData);
            fs.writeFileSync('user.json', JSON.stringify(userArr));
            res.send(`Successfully new user ${reqData.name} Added`);
        }
    } else {
        userArr.push(reqData);
        fs.writeFileSync('user.json', JSON.stringify(userArr));
        res.send(`Successfully new user ${reqData.name} Added`);
    }
}

// update user by id
module.exports.updateById = (req, res, next) => {
    const { id } = req.params;
    const { name, gender, contact, address, photoUrl } = req.body;
    const user = usersList.find(user => user.id == id);
    if (user) {
        if (name) user.name = name;
        if (gender) user.gender = gender;
        if (contact) user.contact = contact;
        if (address) user.address = address;
        if (photoUrl) user.photoUrl = photoUrl;
        fs.writeFileSync('user.json', JSON.stringify(usersList));
        res.status(200).send({
            success: true,
            message: `Successfully updated user ${user.id}`,
            userInfo: user
        });
    } else {
        res.status(404).send({
            success: false,
            message: 'No data match!! Please enter an valid id'
        });
    }
}

//update bulk-users
module.exports.bulkUpdate = (req, res, next) => {
    const reqUsers = req.body;

    if (typeof (reqUsers.length) != "undefined" && reqUsers.length > 0) {
        const invalidIds = [];
        const validIds = [];

        for (const data of req.body) {
            const validUser = usersList.find(user => user.id == data.id);
            if (typeof (validUser) != 'undefined') {
                validIds.push(data.id);
                const { name, gender, contact, address, photoUrl } = data;
                if (name) validUser.name = name;
                if (gender) validUser.gender = gender;
                if (contact) validUser.gender = contact;
                if (address) validUser.contact = address;
                if (photoUrl) validUser.address = photoUrl;
            } else {
                invalidIds.push(data.id);
            }

            fs.writeFileSync('user.json', JSON.stringify(usersList));
        }
        res.status(200).send(
            {
                success: true,
                successfullyUpdate: validIds.length,
                updatedIds: validIds.length > 0 ? validIds : "None",
                failedUpdate: invalidIds.length,
                failedUpdateIds: invalidIds.length > 0 ? invalidIds : "None"
            }
        )
    } else {
        res.status(422).send({
            success: false,
            message: 'Please enter valid JSON data!'
        })
    }
}

// Delete user by id 
module.exports.deleteUserById = (req, res, next) => {
    const { id } = req.body;

    if (usersList.length > 0) {
        const idValidation = usersList.find(user => user.id == id);
        if (idValidation) {
            const finalData = usersList.filter(user => user.id != id);
            fs.writeFileSync('user.json', JSON.stringify(finalData));
            res.status(200).send({
                success: true,
                message: `Successfully remove ${idValidation.name} from database!!`
            });
        } else {
            res.status(404).send(
                {
                    success: false,
                    message: 'Id is not valid!! Enter an valid id.'
                }
            )
        }
    } else {
        res.send("File is empty, You have to add data before execute the delete operation.");
    }

}