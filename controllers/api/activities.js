const Activity = require('../../models/activity');
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
    const activities = await Activity.find({ tripId: req.query.tripId }).populate('address');
    res.json(activities);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  console.log('activity create req.body at controller', req.body)
  try {
    const { activityData, address } = req.body;
    // Create and save the address in the database
    const createdAddress = await Addresses.create(address);
    // Create and save the activity in the database
    const activity = await Activity.create({
      ...activityData,
      address: createdAddress._id
    });
    console.log('activity created at activity create', activity)
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
