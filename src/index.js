// src/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ msg: 'Task Manager API is running 🚀' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Read ENV variables
const PORT = process.env.PORT || 5000;
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

// تأكد أن الباسورد آمن لو فيه رموز خاصة
const encodedPass = encodeURIComponent(DB_PASS);

// Build MongoDB URI dynamically
const uri = `mongodb+srv://${DB_USER}:${encodedPass}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB Connection Error:', err.message);
  });
