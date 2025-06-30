const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins:    { type: Number, default: 0 },
  lastClaimed: { type: Date, default: null },
  referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
