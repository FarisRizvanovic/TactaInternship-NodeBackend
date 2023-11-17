const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    await this.model('Item').deleteMany({ user: this._id });
    await this.model('Shopper').deleteMany({ user: this._id });
    next();
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
