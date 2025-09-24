// index.js - Entry point for Student Record API (using modular routes)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());


// Test endpoint
app.get('/', (req, res) => res.json({ ok: true, message: 'Student Record API is running' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB and start server
async function startServer() {
  try {
    if (!MONGODB_URI) throw new Error('MONGODB_URI not set in .env');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
