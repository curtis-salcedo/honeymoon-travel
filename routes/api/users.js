const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);
// PUT /api/users/recent
router.post('/recent', usersCtrl.setRecent);

module.exports = router;