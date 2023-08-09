const Trip = require('../../models/trip');

module.exports = {
  create,
  update,
  remove,
  index,
  show,
};

async function show(req, res) {
  try {
    // Get one trip from the database
    const trip = await Trip.findById(req.params.id);
    res.json(trip);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    // Get all trips from the database
    const trips = await Trip.find({});
    res.json(trips);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  try {
    // Create and save the trip in the database
    const trip = await Trip.create({
      'user': req.body.user,
      'name': req.body.name,
      'startDate': req.body.startDate,
      'endDate': req.body.endDate,
      'tripDays': req.body.tripDays,
      'travelDays': req.body.travelDays,
      'nonTravelDays': req.body.nonTravelDays,
    });
    trip.save();
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
