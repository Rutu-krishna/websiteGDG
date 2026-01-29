const express = require('express');
const router = express.Router();

const teamCtrl = require('../controllers/memberController');
// Routes
router.get('/members', teamCtrl.getAllMembers);
router.get('/core-team', teamCtrl.getAllDomains);
module.exports = router;