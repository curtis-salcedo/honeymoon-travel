const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String },
  endTime: { type: String },
  details: { type: String },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
