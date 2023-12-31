const mongoose = require('mongoose');
const Address = require('./address'); // Assuming you have an Address model

const accommodationSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  type: { type: String, required: true },
  checkIn: { type: String },
  checkOut: { type: String },
  hasWasherDryer: { type: Boolean, default: false },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
