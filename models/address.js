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
  placeId: { type: String },
  rating: { type: String },
  priceLevel: { type: String },
  phoneNumber: { type: String },
  website: { type: String },
  image: { type: String },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
