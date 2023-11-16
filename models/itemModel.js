const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shoppers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shopper',
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

itemSchema.pre('save', async function (next) {
  if (this.shoppers.length > 2) {
    this.active = false;
  } else {
    this.active = true;
  }

  next();
});

itemSchema.pre('save', async function (next) {
  if (this.shoppers.length > 3) {
    // this.active = false;
    return next(new Error('An item can only have 3 shoppers', 400));
  }
  // this.active = true;

  next();
});

itemSchema.pre('remove', async function (next) {
  this.active = this.shoppers.length - 1 > 3;

  next();
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
