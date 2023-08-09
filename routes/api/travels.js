const express = require('express');
const router = express.Router();
const travelsCtrl = require('../../controllers/api/travels');

// All paths start with '/api/travels'

// POST /api/travels
router.post('/', travelsCtrl.create);
// PUT /api/travels/:id
router.put('/:id', travelsCtrl.update);
// DELETE /api/travels/:id
router.delete('/:id', travelsCtrl.remove);

module.exports = router;
