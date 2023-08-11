const mongoose = require('mongoose');
const Address = require('./address'); // Assuming you have an Address model

const accommodationSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  type: { type: String, required: true },
  name: { type: String },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  checkInTime: { type: String },
  checkOutTime: { type: String },
  location: { type: String },
  hasWasherDryer: { type: Boolean, default: false },
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
