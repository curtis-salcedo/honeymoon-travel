// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Accommodation = require('./models/accommodation');
const Activity = require('./models/activity');
const Address = require('./models/address');
const Meal = require('./models/meal');
const Travel = require('./models/travel');
const Trip = require('./models/trip');

// // Utility functions for API calls
// const {
//   signUp,
//   login,
//   checkToken
// } = require('./utilities/users-api');

// const {
//   createAccommodation,
//   updateAccommodation,
//   deleteAccommodation
// } = require('./utilities/accommodations-api');

// const {
//   createActivity,
//   updateActivity,
//   deleteActivity
// } = require('./utilities/activities-api');

// const {
//   createAddress,
//   updateAddress,
//   deleteAddress
// } = require('./utilities/addresses-api');

// const {
//   createMeal,
//   updateMeal,
//   deleteMeal
// } = require('./utilities/meals-api');

// const {
//   createTravel,
//   updateTravel,
//   deleteTravel
// } = require('./utilities/travels-api');

// const {
//   createTrip,
//   updateTrip,
//   deleteTrip
// } = require('./utilities/trips-api');

// Local variables will come in handy for holding retrieved documents
let user, accommodation, activity, address, meal, travel, trip;
let users, accommodations, activities, addresses, meals, travels, trips;
