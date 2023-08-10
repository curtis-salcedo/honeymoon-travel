const express = require('express');
const router = express.Router();
const activitiesCtrl = require('../../controllers/api/activities');

// All paths start with '/api/activities'

// POST /api/activities
router.post('/', activitiesCtrl.create);
// GET /api/activities
router.get('/', activitiesCtrl.index);
// GET /api/activities/:id
router.get('/:id', activitiesCtrl.show);
// PUT /api/activities/:id
router.put('/:id', activitiesCtrl.update);
// DELETE /api/activities/:id
router.delete('/:id', activitiesCtrl.remove);

module.exports = router;
