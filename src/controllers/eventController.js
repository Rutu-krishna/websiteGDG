const Event = require('../models/Event');

// Fetch all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ _id: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};