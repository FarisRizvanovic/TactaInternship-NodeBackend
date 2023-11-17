const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

// Creates the user with the given name
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({ name: req.body.name });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

// Gets all users
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('-__v');

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

// Deletes the user with the given ID
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  await user.deleteOne();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
