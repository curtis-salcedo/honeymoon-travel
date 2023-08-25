const Meal = require('../../models/meal');
const Addresses = require('../../models/address');

module.exports = {
  create,
  update,
  remove,
  index,
  show,
};

async function index(req, res) {
  try {
    // Get all meal entries with the matching tripId from the database
    const meals = await Meal.find({ tripId: req.query.tripId }).populate('address');
    res.json(meals);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    // Get one meal entry from the database
    const meal = await Meal.findById(req.params.id);
    res.json(meal);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  try {
    const { mealData, address } = req.body;
    // Create an address in the database
    const createdAddress = await Addresses.create(address);
    // Create and save the meal entry in the database
    const meal = await Meal.create({
      ...mealData,
      address: createdAddress, 
    });
    console.log('meal and address created at meal create', createdAddress, meal);
    res.json(meal);
  } catch (err) {
    res.status(400).json(err);
  }
}


async function update(req, res) {
  try {
    // Update the meal entry in the database
    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMeal);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    // Remove the meal entry from the database
    const removedMeal = await Meal.findByIdAndRemove(req.params.id);
    res.json(removedMeal);
  } catch (err) {
    res.status(400).json(err);
  }
}
