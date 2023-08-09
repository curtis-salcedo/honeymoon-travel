const mongoose = require('mongoose');
const Address = require('./address'); // Assuming you have an Address model

const mealSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  category: { type: String, required: true },
  isReservation: { type: Boolean, default: false, required: true },
  businessName: { type: String, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
  phone: { type: String },
  email: { type: String },
  instagram: { type: String },
  googleMapsLink: { type: String }
});

const meal = mongoose.model('meal', mealSchema);

module.exports = meal;
