const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const eventController = require('../controllers/eventController');
router.post('/', upload.array('images', 10), eventController.createEvent);
router.get('/', eventController.getEvents);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;