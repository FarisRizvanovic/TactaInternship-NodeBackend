const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.get('/:userId', itemController.getItemsForUser);

router.put('/:itemId/:shopperId', itemController.addShopperToItem);

router.delete('/:itemId', itemController.deleteItem);

router
  .route('/:itemId/:shopperId')
  .delete(itemController.deleteShopperFromItem);

router.route('/').get(itemController.getItems).post(itemController.createItem);

module.exports = router;
