const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.route('/').get(itemController.getItems).post(itemController.createItem);

module.exports = router;
