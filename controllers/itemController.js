const Item = require('../models/itemModel');
const catchAsync = require('../utils/catchAsync');

exports.createItem = catchAsync(async (req, res, next) => {
  const newItem = await Item.create({
    name: req.body.name,
    user: req.body.userId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      item: newItem,
    },
  });
});

exports.getItems = catchAsync(async (req, res, next) => {
  const items = await Item.find().select('-__v');

  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

exports.getItemsForUser = catchAsync(async (req, res, next) => {
  const items = await Item.find({ user: req.params.userId }).select('-__v');

  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

exports.addShopperToItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);

  // if (item.shopper.length === 3) {
  //   return next(new Error('An item can only have 3 shoppers'));
  // }

  item.shoppers.push(req.params.shopperId);
  await item.save();

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});

exports.deleteShopperFromItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);

  let removed = false;

  item.shoppers.forEach((shopper, index) => {
    if (shopper !== req.params.shopperId && !removed) {
      removed = true;
      item.shoppers.splice(index, 1);
    }
  });

  await item.save();

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});
