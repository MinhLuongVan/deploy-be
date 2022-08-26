const express = require('express');
// const authController = require('../controller/authController');
const middleware = require('../controller/middleware');
const userController = require('../controller/userController');
const router = express.Router();

router.get('/',middleware.verifyToken,userController.getAllUsers);
router.delete('/:id',middleware.verifyTokenAuth,userController.deleteUser);
router.put('/:id',middleware.verifyTokenAuth,userController.updateUser);
router.get('/:userID',userController.getUsersID);
router.get('/:userID/tdlist',userController.getUserTDList); 
// router.post('/:userID/tdlist',userController.postUserTDList);


module.exports = router;