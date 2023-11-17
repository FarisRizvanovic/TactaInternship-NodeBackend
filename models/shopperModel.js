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
    required: true,
  },
});

// Deletes all occurrences of the shopper with the given ID in the items collection
shopperSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    await this.model('Item').updateMany(
      { shoppers: this._id },
      { $pull: { shoppers: this._id } },
    );
    next();
  },
);

const Shopper = mongoose.model('Shopper', shopperSchema);

module.exports = Shopper;
