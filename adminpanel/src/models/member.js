const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g., "Lead Developer"
  imageUrl: { type: String, default: 'placeholder.jpg' },
  linkedin: String,
  twitter: String,
  order: { type: Number, default: 0 } // To sort who shows up first
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);