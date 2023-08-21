const Address = require('../../models/address');

module.exports = {
  create,
  update,
  remove,
  index,
  show
};

async function show(req, res) {
  try {
    // Get one address from the database
    const address = await Address.findById(req.params.id);
    console.log(address)
    res.json(address);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    // Find all addresses for a trip
    const addresses = await Address.find({ tripId: req.query.tripId });
    res.json(addresses);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  try {
    // Create and save the address in the database
    const address = await Address.create(req.body);
    res.json(address);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    // Update the address in the database
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAddress);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    // Remove the address from the database
    const removedAddress = await Address.findByIdAndRemove(req.params.id);
    res.json(removedAddress);
  } catch (err) {
    res.status(400).json(err);
  }
}
