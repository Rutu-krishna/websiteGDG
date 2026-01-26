require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const connectDB = require('./config/db');
const eventRoutes = require('./src/routes/eventRoutes');
const snippetRoutes=require('./src/routes/snippetRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads folder exists
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// Database
connectDB();
// 1. Body Parser (Always First)
app.use(express.json());


app.use('/api/events', eventRoutes);
// Change this line to something unique
app.use('/api/v1/snippets', snippetRoutes);
app.use(express.static(__dirname));
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






