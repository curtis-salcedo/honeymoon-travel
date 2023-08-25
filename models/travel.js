const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  type: { type: String, required: true },
  startLocation: { type: String },
  endLocation: { type: String },
  identifier: { type: String },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
});

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;