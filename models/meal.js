const mongoose = require('mongoose');
const Address = require('./address'); // Assuming you have an Address model

const mealSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  date: { type: Date, required: true },
  type: { enum: ['Breakfast', 'Lunch', 'Dinner','Libations', 'Other'] },
  isReservation: { type: Boolean, default: false, required: true },
  businessName: { type: String, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
  phone: { type: String },
  email: { type: String },
  instagram: { type: String },
  googleMapsLink: { type: String }
});

const meal = mongoose.model('Meal', mealSchema);

module.exports = meal;
