const users = require('../user.json');
const fs = require('fs');

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

// update user by id
module.exports.updateById = (req, res, next) => {
    const { id } = req.params;
    const { name, gender, contact, address, photoUrl } = req.body;
    const dataRes = fs.readFileSync('user.json');
    const usersData = JSON.parse(dataRes);
    const user = usersData.find(user => user.id == id);
    if (user) {
        if (name) user.name = name;
        if (gender) user.gender = gender;
        if (contact) user.contact = contact;
        if (address) user.address = address;
        if (photoUrl) user.photoUrl = photoUrl;
        fs.writeFileSync('user.json', JSON.stringify(usersData));
        res.send(`Successfully updated user ${user.id}`);
    } else {
        res.send('No data match!! Please enter an valid id');
    }
}

//update bulk-users
module.exports.bulkUpdate = (req, res, next) => {
    const reqUsers = req.body;
    // console.log(reqUsers.length)
    // console.log();
    const resUsers = fs.readFileSync('user.json');
    const users = JSON.parse(resUsers);

    if (typeof (reqUsers.length) != "undefined" && reqUsers.length > 0) {
        console.log('valid data');
        console.log(users)
        const invalidIds = [];
        const validIds = [];
        for (const data of req.body) {
            // updateOps[ops.propName] = ops.value;
            // console.log(ops);
            // console.log(data)
            const validUser = users.find(user => user.id == data.id);
            if (typeof (validUser) != 'undefined') {
                validIds.push(data.id);
                const user = users.find(user => user.id == validUser.id);
                const { name, gender, contact, address, photoUrl } = data;
                if (name) validUser.name = name;
                if (gender) validUser.gender = gender;
                if (contact) validUser.gender = contact;
                if (address) validUser.contact = address;
                if (photoUrl) validUser.address = photoUrl;



            } else {
                invalidIds.push(data.id);
            }
            fs.writeFileSync('user.json', JSON.stringify(users))
            // console.log(availableData);
        }
        // console.log(users);
        res.send(`Data match by these ids ${validIds} & successfully updated data No data match by this ${invalidIds} id!! Please enter an valid id`);
    } else {
        console.log('please enter valid data!')
    }
}

// Delete user by id 
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