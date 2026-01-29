require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Added for folder checking
const connectDB = require('./config/db');

// Import Routes (NOT Models)
const eventRoutes = require('./src/routes/eventRoutes');
const snippetRoutes = require('./src/routes/codeRoutes');
const memberRoutes = require('./src/routes/memberRoutes'); // You need this file

const app = express();

// 1. DATABASE CONNECTION
connectDB();

// 2. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 3. STATIC FILE SERVING
// Fix: Serve 'uploads' and 'memberphoto' folders
app.use('/uploads', express.static(path.join(__dirname, 'adminpanel/uploads')));
app.use('/memberphoto', express.static(path.join(__dirname, 'adminpanel/memberphoto')));

app.use(express.static(__dirname)); 

// Ensure folders exist so the server doesn't crash on upload
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
if (!fs.existsSync('./memberphoto')) fs.mkdirSync('./memberphoto');

// 4. API ROUTES
app.use('/api/events', eventRoutes);
app.use('/api/v1/snippets', snippetRoutes);
app.use('/api/team', memberRoutes); // Use the route file, not the model

// 5. START SERVER
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});