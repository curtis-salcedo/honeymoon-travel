const express = require('express');
const router = express.Router();
const mealsCtrl = require('../../controllers/api/meals');

// All paths start with '/api/meals'

// POST /api/meals
router.post('/', mealsCtrl.create);
// GET /api/meals
router.get('/', mealsCtrl.index);
// GET /api/meals/:id
router.get('/:id', mealsCtrl.show);
// PUT /api/meals/:id
router.put('/:id', mealsCtrl.update);
// DELETE /api/meals/:id
router.delete('/:id', mealsCtrl.remove);

module.exports = router;
