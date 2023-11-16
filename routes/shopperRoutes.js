const express = require('express');
const shopperController = require('../controllers/shopperController');

const router = express.Router();

router
  .route('/')
  .get(shopperController.getAllShoppers)
  .post(shopperController.createShopper);

module.exports = router;
