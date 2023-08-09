const mongoose = require('mongoose');
const Address = require('./address'); // Assuming you have an Address model

const accommodationSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  type: { enum: ['Hotel', 'Airbnb'] },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  checkInTime: { type: Date },
  checkOutTime: { type: Date },
  location: { type: String },
  hasWasherDryer: { type: Boolean }
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
