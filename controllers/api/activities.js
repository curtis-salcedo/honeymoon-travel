const Activity = require('../../models/activity');

module.exports = {
  create,
  update,
  remove,
};

async function create(req, res) {
  try {
    // Create and save the activity in the database
    const activity = await Activity.create(req.body);
    res.json(activity);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    // Update the activity in the database
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedActivity);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    // Remove the activity from the database
    const removedActivity = await Activity.findByIdAndRemove(req.params.id);
    res.json(removedActivity);
  } catch (err) {
    res.status(400).json(err);
  }
}
