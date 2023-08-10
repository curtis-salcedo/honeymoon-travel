const Travel = require('../../models/travel');

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
    const travels = await Travel.find({});
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
  try {
    // Create and save the travel situation in the database
    const Travel = await Travel.create(req.body);
    res.json(Travel);
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
