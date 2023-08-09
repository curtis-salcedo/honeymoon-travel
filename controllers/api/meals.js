const meal = require('../../models/meal');

module.exports = {
  create,
  update,
  remove,
};

async function create(req, res) {
  try {
    // Create and save the meal entry in the database
    const meal = await meal.create(req.body);
    res.json(meal);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    // Update the meal entry in the database
    const updatedmeal = await meal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedmeal);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    // Remove the meal entry from the database
    const removedmeal = await meal.findByIdAndRemove(req.params.id);
    res.json(removedmeal);
  } catch (err) {
    res.status(400).json(err);
  }
}
