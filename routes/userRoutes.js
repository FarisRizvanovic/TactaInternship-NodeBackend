const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.delete('/:userId', userController.deleteUser);

router.route('/').get(userController.getUsers).post(userController.createUser);

module.exports = router;
