const express = require('express');
const router = express.Router();
const memberCtrl = require('../controllers/memberController');

// Public route
router.get('/', memberCtrl.getAllMembers);

// Admin only routes (You'd eventually add auth middleware here)
router.post('/add', memberCtrl.addMember);
router.delete('/:id', memberCtrl.deleteMember);

module.exports = router;