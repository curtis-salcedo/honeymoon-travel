const Travel = require('../../models/travel');
const Address = require('../../models/address');

module.exports = {
  create,
  update,
  remove,
  index,
  show,
};

async function index(req, res) {
  try {
    // Find all travels
    const travels = await Travel.find({ tripId: req.query.tripId }).populate('departureLocation').populate('arrivalLocation');
    res.json(travels);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    // Find the travel situation by the ID in the URL
    const travel = await Travel.findById(req.params.id);
    res.json(travel);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  console.log(req.body)
  try {
    const departure = await Address.create(req.body.departureLocation);
    const arrival = await Address.create(req.body.arrivalLocation);
    console.log('departure', departure)
    console.log('arrival', arrival)

    // Create and save the travel situation in the database
    const travel = await Travel.create({
      ...req.body,
      departureLocation: departure._id,
      arrivalLocation: arrival._id,
    });
    res.json(travel);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    // Update the travel situation in the database
    const updatedTravel = await Travel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTravel);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    // Remove the travel situation from the database
    const removedTravel = await Travel.findByIdAndRemove(req.params.id);
    res.json(removedTravel);
  } catch (err) {
    res.status(400).json(err);
  }
}
