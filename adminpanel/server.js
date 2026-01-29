// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const connectDB = require('./config/db');
// const eventRoutes = require('./src/routes/eventRoutes');
// const snippetRoutes=require('./src/routes/snippetRoutes');


// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// connectDB();
// app.use(express.json());


// app.use('/api/events', eventRoutes);
// app.use('/api/v1/snippets', snippetRoutes);
// app.use(express.static(__dirname));
// const PORT = process.env.PORT || 5501;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const connectDB = require('./config/db');
const eventRoutes = require('./src/routes/eventRoutes');
const snippetRoutes = require('./src/routes/snippetRoutes');
// NEW: Import Team Routes
const memberRoutes = require('./src/routes/memberRoutes'); 
const memberPhotoPath = './memberphoto';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Only need this once
app.use('/uploads', express.static('uploads'));
app.use('/memberphoto', express.static('memberphoto'));

// Ensure uploads folder exists for images
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
// Ensure memberphoto folder exists
if (!fs.existsSync(memberPhotoPath)) { fs.mkdirSync(memberPhotoPath); }

// Serve the memberphoto folder as static

// ... rest of the server code ...




// Database Connection
connectDB();

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/v1/snippets', snippetRoutes);
// NEW: Team & Core Domain Routes
app.use('/api/team', memberRoutes); 

app.use(express.static(__dirname));

const PORT = process.env.PORT || 5501;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



