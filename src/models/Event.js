const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    category: String,
    title: String,
    day: Number,
    month: String,
    year: Number,
    time: String,
    location: String,
    description: String,
    regLink: String,
    images: [String]
});

// Exporting the model
module.exports = mongoose.model('Event', eventSchema, 'events');