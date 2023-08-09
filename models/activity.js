const mongoose = require('mongoose');
const Address = require('./address'); // Assuming you have an Address model

const activitySchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  details: { type: String },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
