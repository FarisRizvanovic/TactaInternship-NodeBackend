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
  },
  shopper: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shopper',
    },
  ],
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
