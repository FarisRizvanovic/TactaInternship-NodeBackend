const Shopper = require('../models/shopperModel');
const catchAsync = require('../utils/catchAsync');
const Item = require('../models/itemModel');

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

exports.getShoppersForUser = catchAsync(async (req, res, next) => {
  const shoppers = await Shopper.find({ user: req.params.userId }).select(
    '-__v',
  );

  res.status(200).json({
    status: 'success',
    results: shoppers.length,
    data: {
      shoppers,
    },
  });
});

exports.getShoppersWithItemsForUser = catchAsync(async (req, res, next) => {
  const shoppers = await Shopper.find({ user: req.params.userId }).select(
    '-__v',
  );

  const shoppersWithItems = await Promise.all(
    shoppers.map(async (shopper) => {
      const items = await Item.find({ shopper: shopper._id }).select('-__v');
      return { ...shopper._doc, items };
    }),
  );

  res.status(200).json({
    status: 'success',
    results: shoppersWithItems.length,
    data: {
      shoppersWithItems,
    },
  });
});
