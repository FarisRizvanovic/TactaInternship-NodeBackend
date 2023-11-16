const Shopper = require('../models/shopperModel');
const catchAsync = require('../utils/catchAsync');

exports.createShopper = catchAsync(async (req, res, next) => {
  const newShopper = await Shopper.create({
    name: req.body.name,
    user: req.body.userId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      shopper: newShopper,
    },
  });
});

exports.getAllShoppers = catchAsync(async (req, res, next) => {
  const shoppers = await Shopper.find().select('-__v');

  res.status(200).json({
    status: 'success',
    results: shoppers.length,
    data: {
      shoppers,
    },
  });
});
