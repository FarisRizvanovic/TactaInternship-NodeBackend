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
