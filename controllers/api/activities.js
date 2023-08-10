const Activity = require('../../models/activity');

module.exports = {
  create,
  update,
  remove,
  index,
  show,
};

async function show(req, res) {
  try {
    // Find the activity by the ID in the URL
    const activity = await Activity.findById(req.params.id);
    res.json(activity);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    // Find all activities
    const activities = await Activity.find({});
    res.json(activities);
  } catch (err) {
    res.status(400).json(err);
  }
}

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
