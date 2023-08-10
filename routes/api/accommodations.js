const express = require('express');
const router = express.Router();
const accommodationsCtrl = require('../../controllers/api/accommodations');

// All paths start with '/api/accommodations'

// POST /api/accommodations
router.post('/', accommodationsCtrl.create);
// GET /api/accommodations
router.get('/', accommodationsCtrl.index);
// GET /api/accommodations/:id
router.get('/:id', accommodationsCtrl.show);
// PUT /api/accommodations/:id
router.put('/:id', accommodationsCtrl.update);
// DELETE /api/accommodations/:id
router.delete('/:id', accommodationsCtrl.remove);

module.exports = router;
