const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const imagePaths = req.files.map(file => 
            `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
        );
        const newEvent = new Event({ ...req.body, images: imagePaths });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ _id: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



