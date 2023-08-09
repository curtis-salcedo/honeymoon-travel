const express = require('express');
const router = express.Router();
const tripsCtrl = require('../../controllers/api/trips');

// All paths start with '/api/trips'

// POST /api/trips
router.post('/', tripsCtrl.create);
// PUT /api/trips/:id
router.put('/:id', tripsCtrl.update);
// DELETE /api/trips/:id
router.delete('/:id', tripsCtrl.remove);

module.exports = router;
