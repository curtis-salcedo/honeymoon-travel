const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  addressNumber: { type: String },
  city: { type: String },
  country: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  name: { type: String },
  state: { type: String },
  streetName: { type: String },
  zipCode: { type: String },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
