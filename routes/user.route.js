const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

router
    .route('/all')
    .get(userController.getAllUsers)

router
    .route('/:id')
    .get(userController.getUserById)

router
    .route('/save')
    .post(userController.saveUser)

router
    .route('/update/:id')
    .patch(userController.updateById)

router
    .route('/bulk-update')
    .patch(userController.bulkUpdate)

router
    .route('/delete')
    .delete(userController.deleteUserById)


module.exports = router;