const mongoose = require('mongoose');
const Address = require('./address'); // Assuming you have an Address model

const mealSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  date: { type: Date },
  type: { type: String },
  isReservation: { type: Boolean, default: false, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
});

const meal = mongoose.model('Meal', mealSchema);

module.exports = meal;
