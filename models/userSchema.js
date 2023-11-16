const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  shoppers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shopper',
      },
    ],
    select: false,
  },
  items: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
    select: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
