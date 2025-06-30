const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message) {
      return res.status(400).json({ error: 'Subject and message are required.' });
    }
    const complaint = await Complaint.create({
      user: req.user.id,
      subject,
      message,
    });
    res.status(201).json(complaint);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  // For admin only
  try {
    if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
    const complaints = await Complaint.find().populate('user', 'username email').sort({ createdAt: -1 });
    res.json(complaints);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  // For admin only
  try {
    if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
    const { id } = req.params;
    const { status } = req.body;
    if (!['open', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }
    const update = { status };
    if (status === 'resolved') update.resolvedAt = new Date();
    const complaint = await Complaint.findByIdAndUpdate(id, update, { new: true });
    if (!complaint) return res.status(404).json({ error: 'Complaint not found.' });
    res.json(complaint);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
