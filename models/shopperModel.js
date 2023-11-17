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

shopperSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    // await this.model('Item').deleteMany({ shoppers: this._id });
    await this.model('Item').updateMany(
      { shoppers: this._id },
      { $pull: { shoppers: this._id } },
    );
    next();
  },
);

const Shopper = mongoose.model('Shopper', shopperSchema);

module.exports = Shopper;
