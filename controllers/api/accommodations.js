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
    const accommodations = await Accommodation.find({ tripId: req.query.tripId }).populate('address');
    res.json(accommodations);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  console.log(req.body);
  try {
    const { accommodationData, address } = req.body;
    // Create and save the address in the database
    const createdAddress = await Addresses.create(address);
    console.log('Address created at accommodation create', createdAddress);
    // Create and save the accommodation in the database
    const accommodation = await Accommodation.create({
      ...accommodationData,
      address: createdAddress._id
    });
    console.log('Accommodation created at accommodation create', accommodation);
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
