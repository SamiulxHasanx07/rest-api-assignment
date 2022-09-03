const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');


/***
 * Get all users
 * @apiEndpoint {GET} /user/all
 * @apiEndpointExample /user/all
 * @apiEndpointExampleWithQuery /user/all?limit=3
 * @APIDescription Get all users list
 * @apiPermission anyone
 * @QueryParameter /user/all/?limit=number
 * @apiSuccess {Array of Object[{}]} users array of object
 * **/
router
    .route('/all')
    .get(userController.getAllUsers)

/***
 * Get User by ID
 * @apiEndpoint {GET} /user/:id
 * @endPointExample /user/4
 * @APIDescription Get single user by its id
 * @apiPermission anyone
 * @QueryParameter no
 * @apiSuccess {object{}} user array object
 * **/

router
    .route('/:id')
    .get(userController.getUserById)


/***
 * Add user
 * @apiEndpoint {POST} /user/save
 * @endPointExample /user/save
 * @apiBody Body takes JSON object
 * @apiBodyDataExampl
 * {
  "id": 16,
  "gender": "male",
  "name": "MR Jhon",
  "contact": "01788888",
  "address": "Address Here",
  "photoUrl": "https://images.unsplash.com/photo-1662129332314-eeb029c8dbd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
}
 * @APIDescription Save a user
 * @apiPermission anyone
 * @QueryParameter no
 * @apiTakes {object{}} user object
 * @apiSuccess return {object{}} success with message property
 * @apiError 409 user not exists
 * **/
router
    .route('/save')
    .post(userController.saveUser)

/***
* Update user by ID
* @apiEndpoint {PATCH} /user/update/:id
* @endPointExample /user/update/4
* @APIDescription This end point update single user info
* @apiBodyDataExampl
*{
*"gender": "male",
*"name": "Rion",
*"contact": "017788888",
*"address": "Address Here",
*"photoUrl": "https://images.unsplash.com/photo-1662129332314-eeb029c8dbd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
*}
* @apiPermission anyone
* @QueryParameter no
*@parameters number
* @apiSuccess {object{}} user array object
 *@apiError 404 not found user not exists
* **/
router
    .route('/update/:id')
    .patch(userController.updateById)

/***
* Update bulk user or multiple users
* @apiEndpoint {PATCH} /user/bulk-update
* @endPointExample /user/bulk-update
* @APIDescription This end point update multiple user data
* @apiBodyDataExampl api body takes array of object
*[
  {
    "gender": "4",
    "name": "Rion",
    "contact": "01788058690",
    "address": "Address Here",
    "photoUrl": "https://images.unsplash.com/photo-1662129332314-eeb029c8dbd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    "id": 16,
    "gender": "male",
    "name": "MR Spidrman",
    "contact": "014752424",
    "address": "Address Here",
    "photoUrl": "https://images.unsplash.com/photo-1662129332314-eeb029c8dbd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  }
]
* @apiPermission anyone
* @QueryParameter no
*@parameters number
* @apiSuccess {object{}} user array object
*@apiError 404 not found user not exists
* **/
router
    .route('/bulk-update')
    .patch(userController.bulkUpdate)

/***
 * Get all users
 * @apiEndpoint {DELETE} /user/delete
 * @apiEndpointExample /user/delete
 * @APIDescription Delete single user using id provided by body
 * @apiPermission anyone
 * @ApiBody
 * {
 *"id":2
 *}
 * @apiSuccess {Array of Object[{}]} success and message
 * @apiError 404 not found
 * **/
router
    .route('/delete')
    .delete(userController.deleteUserById)


module.exports = router;