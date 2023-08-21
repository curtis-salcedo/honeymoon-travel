const Accommodation = require('../../models/accommodation');
const Addresses = require('../../models/address');

module.exports = {
  create,
  update,
  remove,
  index,
  show,
};

async function show(req, res) {
  try {
    // Get one accommodation from the database
    const accommodation = await Accommodation.findById(req.params.id);
    res.json(accommodation);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    // Find all accommodations for a trip
    const accommodations = await Accommodation.find({ tripId: req.query.tripId });
    res.json(accommodations);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  console.log(req.body)
  try {
    const address = await Addresses.create(req.body.address);
    console.log(address)
    address.save();
    // Create and save the accommodation in the database
    const accommodation = await Accommodation.create({
      ...req.body,
      address: address._id
    });
    accommodation.save();
    res.json(accommodation);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    // Update the accommodation in the database
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAccommodation);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    // Remove the accommodation from the database
    const removedAccommodation = await Accommodation.findByIdAndRemove(req.params.id);
    res.json(removedAccommodation);
  } catch (err) {
    res.status(400).json(err);
  }
}
