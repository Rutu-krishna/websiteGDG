const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const eventRoutes = require('./src/routes/eventRoutes');
const snippetRoutes = require('./src/routes/codeRoutes');
const app = express();

// 1. MIDDLEWARE
app.use(cors());
app.use(express.json());

// Serving Static Files (Images and HTML)
app.use('/uploads', express.static(path.join(__dirname, 'adminpanel/uploads')));
app.use(express.static(__dirname)); // This helps find your index.html

connectDB();
// 3. API ROUTES
app.use('/api/events', eventRoutes);
app.use('/api/v1/snippets', snippetRoutes);
app.use(express.static(__dirname));
// 4. START SERVER
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});