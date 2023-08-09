const mongoose = require('mongoose');
const Address = require('./address'); // Assuming you have an Address model

const travelSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  type: { type: String, enum: ['Flight', 'Train', 'Cab', 'Bus', 'Ferry'], required: true },
  startLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  endLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isBooked: { type: Boolean, required: true },
  cost: { type: Number, default: 0 },
  identifier: { type: String }
});

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;