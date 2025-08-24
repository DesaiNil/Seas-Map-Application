require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const mapRoutes = require('./routes/maps.js');
app.use('/api/maps', mapRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


// error 
  app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Optional: serve frontend statically
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));