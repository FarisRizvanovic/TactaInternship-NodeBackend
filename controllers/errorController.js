const AppError = require('../utils/appError');

// Sends error in development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
    stack: err.stack,
  });
};

// Handles invalid database IDs
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Handles duplicate fields in the database
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`;
  return new AppError(message, 400);
};

// Sends error in production
const sendErrorProduction = (err, res) => {
  // Operational, trusted errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Error', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV !== 'production') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    // Cast error happens when the id is not valid
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    // Duplicate error
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);

    sendErrorProduction(error, res);
  }
};
