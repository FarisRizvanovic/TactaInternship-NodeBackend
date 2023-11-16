const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.route('/:userId').get(itemController.getItemsForUser);

router.route('/:itemId/:shopperId').put(itemController.addShopperToItem);

router.route('/').get(itemController.getItems).post(itemController.createItem);

module.exports = router;
