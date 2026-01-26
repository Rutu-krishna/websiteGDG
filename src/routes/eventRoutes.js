const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Define the route
router.get('/', eventController.getAllEvents);

module.exports = router;