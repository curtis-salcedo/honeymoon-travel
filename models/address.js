const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  addressNumber: { type: String },
  streetName: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  country: { type: String },
  longitude: { type: Number },
  latitude: { type: Number },
  name: { type: String },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
