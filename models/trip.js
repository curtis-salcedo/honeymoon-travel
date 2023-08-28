const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true, index: true },
  endDate: { type: Date, required: true, index: true },
  tripDays: [{ type: Date, required: true }],
});

function endDateValidator() {
  return this.endDate >= this.startDate;
}

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
