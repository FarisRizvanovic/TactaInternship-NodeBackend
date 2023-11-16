const mongoose = require('mongoose');

const shopperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Shopper = mongoose.model('Shopper', shopperSchema);

module.exports = Shopper;
