const Trip = require('../../models/trip');

module.exports = {
  create,
  update,
  remove,
};

async function create(req, res) {
  try {
    // Create and save the trip in the database
    const trip = await Trip.create(req.body);
    res.json(trip);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    // Update the trip in the database
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    // Remove the trip from the database
    const removedTrip = await Trip.findByIdAndRemove(req.params.id);
    res.json(removedTrip);
  } catch (err) {
    res.status(400).json(err);
  }
}
