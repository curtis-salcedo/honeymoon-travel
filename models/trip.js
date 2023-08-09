const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  startDate: { type: Date, required: true, index: true },
  endDate: { type: Date, required: true, index: true },
  totalDays: { type: Number, required: true },
  travelDays: { type: Number, required: true },
  nonTravelDays: { type: Number, required: true },
});

function endDateValidator() {
  return this.endDate >= this.startDate;
}

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
