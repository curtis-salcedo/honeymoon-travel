const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  type: { type: String, required: true }, // 'Flight', 'Train', etc.
  departureLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true},
  arrivalLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true},
  identifier: { type: String }, // Flight number, train number, etc.
  departureDateTime: { type: Date, required: true },
  arrivalDateTime: { type: Date, required: true },
});

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;