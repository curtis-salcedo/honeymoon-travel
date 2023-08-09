const express = require('express');
const router = express.Router();
const mealsCtrl = require('../../controllers/api/meals');

// All paths start with '/api/meals'

// POST /api/meals
router.post('/', mealsCtrl.create);
// PUT /api/meals/:id
router.put('/:id', mealsCtrl.update);
// DELETE /api/meals/:id
router.delete('/:id', mealsCtrl.remove);

module.exports = router;
