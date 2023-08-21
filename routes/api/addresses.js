const express = require('express');
const router = express.Router();
const addressesCtrl = require('../../controllers/api/addresses');

// All paths start with '/api/addresses'

// POST /api/addresses
router.post('/', addressesCtrl.create);
// PUT /api/addresses/:id
router.put('/:id', addressesCtrl.update);
// DELETE /api/addresses/:id
router.delete('/:id', addressesCtrl.remove);
// GET /api/addresses
router.get('/', addressesCtrl.index);
// GET /api/addresses/:id
router.get('/:id', addressesCtrl.show);

module.exports = router;
