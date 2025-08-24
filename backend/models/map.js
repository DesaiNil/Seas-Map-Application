const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
  distance: { type: Number, required: true }
});

const mapSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  paths: [pathSchema]
});

module.exports = mongoose.model('Map', mapSchema);
