const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  setRecent,
};

async function setRecent(req, res) {
  try {
    // Find the user by their ID
    const user = await User.findOneAndUpdate(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Set the recentlySelectedTrip field to the trip ID
    user.recentlySelectedTrip = req.body;
    console.log('user after recently selected is here', user)
    // Save the updated user document
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}