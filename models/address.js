const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  locationName: { type: String },
  streetAddress: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  zipCode: { type: String }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
