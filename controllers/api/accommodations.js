const Accommodation = require('../../models/accommodation');

module.exports = {
  create,
  update,
  remove,
};

async function create(req, res) {
  try {
    // Create and save the accommodation in the database
    const accommodation = await Accommodation.create(req.body);
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
