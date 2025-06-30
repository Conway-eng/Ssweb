const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const auth = require('../middleware/auth');

// User submits a complaint
router.post('/', auth, complaintController.createComplaint);

// User views their complaints
router.get('/mine', auth, complaintController.getMyComplaints);

// Admin: view all complaints
router.get('/', auth, complaintController.getAllComplaints);

// Admin: update complaint status
router.patch('/:id', auth, complaintController.updateComplaintStatus);

module.exports = router;
