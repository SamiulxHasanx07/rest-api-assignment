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


module.exports = router;