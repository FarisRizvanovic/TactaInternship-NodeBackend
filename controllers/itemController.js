const Item = require('../models/itemModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Shopper = require('../models/shopperModel');

// Creates the item with the given name
exports.createItem = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.body.userId);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

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

// Gets all items
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

// Gets all items for the given user ID
exports.getItemsForUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  const items = await Item.find({ user: req.params.userId }).select('-__v');

  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

// Add a shopper to an item because the item is on the shopper's list
exports.addShopperToItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  const shopper = await Shopper.findById(req.params.shopperId);

  if (!shopper) {
    return next(new AppError('No shopper found with that ID', 404));
  }

  if (!item) {
    return next(new AppError('No item found with that ID', 404));
  }

  if (!item.active) {
    return next(new AppError('An item can only have 3 shoppers', 400));
  }

  item.shoppers.push(req.params.shopperId);
  await item.save();

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});

// Remove a shopper from an item
exports.deleteShopperFromItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  const shopper = await Shopper.findById(req.params.shopperId);

  if (!shopper) {
    return next(new AppError('No shopper found with that ID', 404));
  }

  if (!item) {
    return next(new AppError('No item found with that ID', 404));
  }

  let removed = false;

  item.shoppers.forEach((_shopper, index) => {
    if (_shopper !== req.params.shopperId && !removed) {
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

// Deletes the item with the given ID
exports.deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.itemId);

  if (!item) {
    return next(new AppError('No item found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
