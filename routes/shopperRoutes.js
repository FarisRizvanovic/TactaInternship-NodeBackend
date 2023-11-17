const express = require('express');
const shopperController = require('../controllers/shopperController');

const router = express.Router();

router.get('/user/:userId', shopperController.getShoppersForUser);

router.delete('/:shopperId', shopperController.deleteShopper);

router.get(
  '/user/:userId/items',
  shopperController.getShoppersWithItemsForUser,
  // shopperController.test,
);

router
  .route('/')
  .get(shopperController.getAllShoppers)
  .post(shopperController.createShopper);

module.exports = router;
