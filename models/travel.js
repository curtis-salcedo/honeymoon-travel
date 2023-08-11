const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  type: { enum: ['Flight', 'Train', 'Cab', 'Bus', 'Ferry'] },
  startLocation: { type: String },
  endLocation: { type: String },
  identifier: { type: String },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  isBooked: { type: Boolean, required: true },
});

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;