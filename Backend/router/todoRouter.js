const express = require('express')
const router = express.Router();
const todoController = require('../controller/todoController');
const middleware = require('../controller/middleware');

// router.get('/',middleware.verifyToken,todoController.getTest);
router.get('/page',middleware.verifyToken,todoController.getListPage);
router.post('/todo',middleware.verifyToken,todoController.createList);
router.delete('/:id',middleware.verifyToken,todoController.deleteList);
router.delete('/',middleware.verifyToken,todoController.deleteAllList);
router.put('/:id',middleware.verifyToken,todoController.updateList);
module.exports = router;