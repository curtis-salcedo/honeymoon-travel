const express = require('express');
const router = express.Router();
const tripsCtrl = require('../../controllers/api/trips');

// All paths start with '/api/trips'

// POST /api/trips
router.post('/', tripsCtrl.create);
// GET /api/trips
router.get('/', tripsCtrl.index);
// GET /api/trips/:id
router.get('/:id', tripsCtrl.show);
// PUT /api/trips/:id
router.put('/:id', tripsCtrl.update);
// DELETE /api/trips/:id
router.delete('/:id', tripsCtrl.remove);

module.exports = router;
