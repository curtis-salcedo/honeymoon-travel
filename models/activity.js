const mongoose = require('mongoose');

const activityTypes = ['Tour', 'Class', 'Hike', 'Sightseeing', 'Cultural Event', 'Adventure', 'Relaxation', 'Shopping','Entertainment', 'Museum', 'Nightlife', 'Workshop', 'Other'];


const activitySchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: activityTypes, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String },
  details: { type: String },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
