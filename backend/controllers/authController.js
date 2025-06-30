const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password, referral } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields required.' });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Email already in use.' });
    }
    if (await User.findOne({ username })) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    const hash = await bcrypt.hash(password, 10);
    const referredBy = referral ? (await User.findOne({ _id: referral }))?._id : null;
    const user = await User.create({ username, email, password: hash, referredBy });
    if (referredBy) {
      await User.findByIdAndUpdate(referredBy, { $push: { referrals: user._id }, $inc: { coins: 10 } });
    }
    return res.status(201).json({ message: 'Registration successful!' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'All fields required.' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials.' });
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token, user: { username: user.username, email: user.email, coins: user.coins, isAdmin: user.isAdmin } });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
