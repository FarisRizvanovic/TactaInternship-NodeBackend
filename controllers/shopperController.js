const Shopper = require('../models/shopperModel');
const catchAsync = require('../utils/catchAsync');
const Item = require('../models/itemModel');
const AppError = require('../utils/appError');

// Creates the shopper with the given name
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

// Gets all shoppers
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

// Gets all shopper for the given user ID
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

// Gets all shoppers with items for the given user ID
exports.getShoppersWithItemsForUser = catchAsync(async (req, res, next) => {
  const shoppers = await Shopper.find({ user: req.params.userId }).select(
    '-__v',
  );

  const shoppersWithItems = await Promise.all(
    shoppers.map(async (shopper) => {
      const items = await Item.find({ shoppers: shopper._id }).select(
        '-__v -user -shopper',
      );

      const allItems = [];

      // Not good, but it works :)
      items.forEach((item) => {
        if (item.shoppers.length > 1) {
          item.shoppers.forEach((shopperId) => {
            if (shopperId.toString() === shopper._id.toString()) {
              allItems.push({ name: item.name, _id: item._id });
            }
          });
        } else {
          allItems.push({ name: item.name, _id: item._id });
        }
      });

      return { ...shopper._doc, items: allItems };
    }),
  );

  res.status(200).json({
    status: 'success',
    results: shoppersWithItems.length,
    data: {
      shoppers: shoppersWithItems,
    },
  });
});

// Deletes the shopper with the given ID
exports.deleteShopper = catchAsync(async (req, res, next) => {
  const shopper = await Shopper.findById(req.params.shopperId);

  await shopper.deleteOne();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
