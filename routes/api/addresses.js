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

module.exports = router;
